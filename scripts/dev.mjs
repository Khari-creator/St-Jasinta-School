import { spawn } from "node:child_process";
import fs from "node:fs";
import net from "node:net";
import path from "node:path";
import { fileURLToPath } from "node:url";

const [port = "3000", profile = "default"] = process.argv.slice(2);

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const workspaceRoot = path.resolve(scriptDir, "..");
const nextBin = path.join(workspaceRoot, "node_modules", "next", "dist", "bin", "next");
const preloadScript = path.join(workspaceRoot, "scripts", "next-trace-noop.cjs");
const distDir = `.next-dev-${profile}`;
const absoluteDistDir = path.join(workspaceRoot, distDir);

function canConnect(host, targetPort) {
  return new Promise((resolve) => {
    const socket = net.createConnection({ host, port: Number(targetPort) });

    const finish = (result) => {
      socket.removeAllListeners();
      socket.destroy();
      resolve(result);
    };

    socket.setTimeout(1200);
    socket.once("connect", () => finish(true));
    socket.once("timeout", () => finish(false));
    socket.once("error", () => finish(false));
  });
}

if (await canConnect("127.0.0.1", port)) {
  console.log(`A server is already responding on http://127.0.0.1:${port}.`);
  console.log("Open that URL in your browser, or run `npm run dev:stop` before starting again.");
  process.exit(0);
}

try {
  fs.rmSync(absoluteDistDir, {
    recursive: true,
    force: true,
    maxRetries: 10,
    retryDelay: 200
  });
} catch (error) {
  console.warn(`Could not fully clear ${distDir}; starting with the existing dev cache.`);
  if (error instanceof Error) {
    console.warn(error.message);
  }
}

const child = spawn(
  process.execPath,
  ["--require", preloadScript, nextBin, "dev", "--hostname", "127.0.0.1", "--port", port],
  {
    cwd: workspaceRoot,
    stdio: "inherit",
    env: {
      ...process.env,
      NEXT_DIST_DIR: distDir
    }
  }
);

child.on("exit", (code, signal) => {
  if (signal) {
    process.kill(process.pid, signal);
    return;
  }

  process.exit(code ?? 0);
});

child.on("error", (error) => {
  console.error(`Failed to start Next.js dev server using ${distDir}.`);
  console.error(error);
  process.exit(1);
});

