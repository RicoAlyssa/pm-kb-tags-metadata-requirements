import fs from "node:fs";
import path from "node:path";

const input = process.argv[2];
const output = process.argv[3];

if (!input || !output) {
  console.error("Usage: node tools/competitor-playwright/sanitize-har.mjs <input.har> <output.json>");
  process.exit(1);
}

const har = JSON.parse(fs.readFileSync(input, "utf8"));
const sensitive = /authorization|cookie|token|secret|signature|credential|session|set-cookie|x-acs-security-token/i;
const sensitivePayloadKey = /token|secret|signature|credential|authorization|session|cookie|traceid|anonymous|userprincipal|nickname|switchagent|switchusertype|uid/i;

function sanitizeUrl(value) {
  try {
    const url = new URL(value);
    for (const key of [...url.searchParams.keys()]) {
      if (sensitive.test(key)) url.searchParams.set(key, "[REDACTED]");
    }
    return url.toString();
  } catch {
    return value;
  }
}

function scrubObject(value) {
  if (Array.isArray(value)) return value.map(scrubObject);
  if (!value || typeof value !== "object") return value;
  return Object.fromEntries(
    Object.entries(value).map(([key, item]) => [
      key,
      sensitivePayloadKey.test(key) ? "[REDACTED]" : scrubObject(item),
    ]),
  );
}

function sanitizePostData(value) {
  if (!value) return null;
  try {
    const form = new URLSearchParams(value);
    if ([...form.keys()].length > 0) {
      const result = {};
      for (const [key, raw] of form.entries()) {
        if (sensitivePayloadKey.test(key)) {
          result[key] = "[REDACTED]";
          continue;
        }
        try {
          result[key] = scrubObject(JSON.parse(raw));
        } catch {
          result[key] = raw;
        }
      }
      return result;
    }
  } catch {
    // Fall through to JSON handling.
  }
  try {
    return scrubObject(JSON.parse(value));
  } catch {
    return value;
  }
}

const entries = (har.log?.entries ?? []).map((entry) => ({
  startedDateTime: entry.startedDateTime,
  durationMs: entry.time,
  request: {
    method: entry.request?.method,
    url: sanitizeUrl(entry.request?.url ?? ""),
    headers: (entry.request?.headers ?? [])
      .filter((header) => !sensitive.test(header.name))
      .map((header) => ({ name: header.name, value: header.value })),
    postData: sanitizePostData(entry.request?.postData?.text),
  },
  response: {
    status: entry.response?.status,
    statusText: entry.response?.statusText,
    contentType: entry.response?.content?.mimeType ?? null,
  },
}));

fs.mkdirSync(path.dirname(path.resolve(output)), { recursive: true });
fs.writeFileSync(output, `${JSON.stringify({ entries }, null, 2)}\n`, { mode: 0o600 });
console.log(`Sanitized ${entries.length} entries -> ${output}`);
