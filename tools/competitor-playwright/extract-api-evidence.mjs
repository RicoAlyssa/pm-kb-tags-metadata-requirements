import fs from "node:fs";

const input = process.argv[2];
const output = process.argv[3];

if (!input || !output) {
  console.error("Usage: node tools/competitor-playwright/extract-api-evidence.mjs <capture.jsonl> <evidence.json>");
  process.exit(1);
}

const sensitive = /token|secret|signature|credential|authorization|session|cookie|traceid|anonymous|userprincipal|nickname|switchagent|switchusertype|uid|hash|(?:tos|oss)path|(^|_)(?:id|ids)$|(?:Id|Ids)$/i;

function scrub(value) {
  if (Array.isArray(value)) return value.map(scrub);
  if (!value || typeof value !== "object") return value;
  return Object.fromEntries(
    Object.entries(value)
      .filter(([key]) => key !== "cornerstoneParam")
      .map(([key, item]) => [key, sensitive.test(key) ? "[REDACTED]" : scrub(item)]),
  );
}

function decodeBody(value) {
  if (!value) return null;
  try {
    const decoded = decodeURIComponent(value);
    if (decoded.startsWith("{") || decoded.startsWith("[")) {
      return scrub(JSON.parse(decoded));
    }
  } catch {
    // Continue with form and plain JSON decoding.
  }
  const form = new URLSearchParams(value);
  const params = form.get("params");
  if (params) {
    try {
      return scrub(JSON.parse(params));
    } catch {
      return null;
    }
  }
  const entries = [...form.entries()];
  if (entries.length === 1 && entries[0][1] === "" && /^[{[]/.test(entries[0][0])) {
    try {
      return scrub(JSON.parse(entries[0][0]));
    } catch {
      return null;
    }
  }
  try {
    return scrub(JSON.parse(value));
  } catch {
    return null;
  }
}

const lines = fs.readFileSync(input, "utf8").split("\n").filter(Boolean);
const events = lines.map((line) => JSON.parse(line));
const responses = new Map();

for (const event of events) {
  if (event.kind !== "response") continue;
  const key = `${event.method} ${event.url}`;
  responses.set(key, event.status);
}

const evidence = [];
for (const event of events) {
  if (event.kind !== "request") continue;
  let url;
  try {
    url = new URL(event.url);
  } catch {
    continue;
  }
  const api = url.searchParams.get("api") ?? url.pathname;
  if (!/(rag|knowledge|index|dataHub|tag|meta|vikingdb)/i.test(api)) continue;
  const body = decodeBody(event.postData);
  evidence.push({
    at: event.at,
    method: event.method,
    gateway: `${url.origin}${url.pathname}`,
    api,
    status: responses.get(`${event.method} ${event.url}`) ?? null,
    data: body?.Data ?? body,
  });
}

const unique = [];
const seen = new Set();
for (const item of evidence) {
  const fingerprint = `${item.method}|${item.api}|${JSON.stringify(item.data)}`;
  if (seen.has(fingerprint)) continue;
  seen.add(fingerprint);
  unique.push(item);
}

fs.writeFileSync(output, `${JSON.stringify({ generatedAt: new Date().toISOString(), evidence: unique }, null, 2)}\n`, { mode: 0o600 });
console.log(`Extracted ${unique.length} sanitized API records -> ${output}`);
