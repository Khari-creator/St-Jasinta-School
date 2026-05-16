import { spawn } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const workspaceRoot = path.resolve(scriptDir, "..");
const nextBin = path.join(workspaceRoot, "node_modules", "next", "dist", "bin", "next");
const preloadScript = path.join(workspaceRoot, "scripts", "next-trace-noop.cjs");

const child = spawn(process.execPath, ["--require", preloadScript, nextBin, "build"], {
  cwd: workspaceRoot,
  stdio: "inherit",
  env: process.env
});

child.on("exit", (code, signal) => {
  if (signal) {
    process.kill(process.pid, signal);
    return;
  }

  process.exit(code ?? 0);
});

child.on("error", (error) => {
  console.error("Failed to start Next.js build.");
  console.error(error);
  process.exit(1);
});

