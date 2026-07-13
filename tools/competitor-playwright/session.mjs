import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import repl from "node:repl";
import { chromium } from "playwright";

const platform = process.argv[2];
const platforms = {
  aliyun: {
    startUrl: "https://bailian.console.aliyun.com/cn-beijing?tab=app#/knowledge-base/create",
  },
  volcengine: {
    startUrl: "https://console.volcengine.com/ark/region:cn-beijing/overview",
  },
};

if (!platforms[platform]) {
  console.error("Usage: node tools/competitor-playwright/session.mjs <aliyun|volcengine>");
  process.exit(1);
}

const root = path.join(os.tmpdir(), "codex-competitor-playwright", platform);
const profileDir = path.join(root, "profile");
const captureDir = path.join(root, "captures");
fs.mkdirSync(profileDir, { recursive: true });
fs.mkdirSync(captureDir, { recursive: true });

const timestamp = new Date().toISOString().replaceAll(":", "-").replaceAll(".", "-");
const harPath = path.join(captureDir, `${platform}-${timestamp}.har`);
const jsonlPath = path.join(captureDir, `${platform}-${timestamp}.jsonl`);
const jsonl = fs.createWriteStream(jsonlPath, { flags: "a", mode: 0o600 });

const context = await chromium.launchPersistentContext(profileDir, {
  headless: false,
  viewport: { width: 1440, height: 900 },
  recordHar: {
    path: harPath,
    content: "omit",
    mode: "full",
  },
});

let page = context.pages()[0] ?? (await context.newPage());

function redactUrl(value) {
  try {
    const url = new URL(value);
    for (const key of [...url.searchParams.keys()]) {
      if (/token|secret|signature|credential|authorization|session|cookie/i.test(key)) {
        url.searchParams.set(key, "[REDACTED]");
      }
    }
    return url.toString();
  } catch {
    return value;
  }
}

const sensitiveKey = /token|secret|signature|credential|authorization|session|cookie|traceid|anonymous|userprincipal|nickname|switchagent|switchusertype|uid/i;

function scrubObject(value) {
  if (Array.isArray(value)) return value.map(scrubObject);
  if (!value || typeof value !== "object") return value;
  return Object.fromEntries(
    Object.entries(value).map(([key, item]) => [
      key,
      sensitiveKey.test(key) ? "[REDACTED]" : scrubObject(item),
    ]),
  );
}

function redactPostData(value) {
  if (!value) return null;
  try {
    const form = new URLSearchParams(value);
    if ([...form.keys()].length > 0) {
      for (const key of [...form.keys()]) {
        if (sensitiveKey.test(key)) {
          form.set(key, "[REDACTED]");
          continue;
        }
        const raw = form.get(key);
        if (!raw) continue;
        try {
          form.set(key, JSON.stringify(scrubObject(JSON.parse(raw))));
        } catch {
          // Keep ordinary non-sensitive form values.
        }
      }
      return form.toString();
    }
  } catch {
    // Fall through to JSON handling.
  }
  try {
    return JSON.stringify(scrubObject(JSON.parse(value)));
  } catch {
    return value;
  }
}

function writeEvent(event) {
  jsonl.write(`${JSON.stringify(event)}\n`);
}

context.on("request", (request) => {
  if (!["xhr", "fetch"].includes(request.resourceType())) return;
  writeEvent({
    at: new Date().toISOString(),
    kind: "request",
    method: request.method(),
    resourceType: request.resourceType(),
    url: redactUrl(request.url()),
    postData: redactPostData(request.postData()),
  });
});

context.on("response", (response) => {
  const request = response.request();
  if (!["xhr", "fetch"].includes(request.resourceType())) return;
  writeEvent({
    at: new Date().toISOString(),
    kind: "response",
    method: request.method(),
    status: response.status(),
    url: redactUrl(response.url()),
  });
});

await page.goto(platforms[platform].startUrl, { waitUntil: "domcontentloaded" });

console.log(`\nStandalone Playwright session: ${platform}`);
console.log(`Profile: ${profileDir}`);
console.log(`HAR: ${harPath}`);
console.log(`Fetch/XHR log: ${jsonlPath}`);
console.log("Available globals: page, context, pages, harPath, jsonlPath");
console.log("Log in manually in the opened browser if needed. Type .exit only after capture is complete.\n");

const shell = repl.start({ prompt: "pw> ", useGlobal: false });
shell.context.page = page;
shell.context.context = context;
shell.context.pages = context.pages();
shell.context.harPath = harPath;
shell.context.jsonlPath = jsonlPath;
shell.context.setPage = (nextPage) => {
  page = nextPage;
  shell.context.page = page;
  return page.url();
};

let closing = false;
async function closeSession() {
  if (closing) return;
  closing = true;
  jsonl.end();
  await context.close();
  console.log(`Capture saved: ${harPath}`);
}

shell.on("exit", async () => {
  await closeSession();
  process.exit(0);
});

process.on("SIGINT", async () => {
  await closeSession();
  process.exit(130);
});
