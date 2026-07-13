import fs from "node:fs";
import { Client } from "/Users/Admin/.vscode/extensions/highagency.pencildev-0.6.61/node_modules/@modelcontextprotocol/sdk/dist/esm/client/index.js";
import { StdioClientTransport } from "/Users/Admin/.vscode/extensions/highagency.pencildev-0.6.61/node_modules/@modelcontextprotocol/sdk/dist/esm/client/stdio.js";

const [command = "list", toolName, argsPath] = process.argv.slice(2);
const transport = new StdioClientTransport({
  command: "/Users/Admin/.pencil/mcp/visual_studio_code/out/mcp-server-darwin-arm64",
  args: ["--app", "visual_studio_code", "--agent", "codexCLI"],
  stderr: "pipe",
});
const client = new Client({ name: "codex-pencil-client", version: "1.0.0" });

transport.stderr?.on("data", (chunk) => process.stderr.write(chunk));

try {
  await client.connect(transport);
  if (command === "list") {
    const result = await client.listTools();
    process.stdout.write(`${JSON.stringify(result, null, 2)}\n`);
  } else if (command === "call") {
    if (!toolName) throw new Error("Usage: call <tool-name> [args-json-file]");
    const args = argsPath ? JSON.parse(fs.readFileSync(argsPath, "utf8")) : {};
    const result = await client.callTool({ name: toolName, arguments: args });
    process.stdout.write(`${JSON.stringify(result, null, 2)}\n`);
  } else {
    throw new Error(`Unknown command: ${command}`);
  }
} finally {
  await client.close();
}
