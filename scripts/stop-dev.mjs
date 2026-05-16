import { spawnSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const workspaceRoot = path.resolve(scriptDir, "..");

if (process.platform !== "win32") {
  console.log("`dev:stop` is currently configured for Windows only.");
  process.exit(0);
}

const escapedWorkspace = workspaceRoot.replace(/'/g, "''");
const command =
  `$workspace = '${escapedWorkspace}'; ` +
  `$targets = Get-CimInstance Win32_Process | Where-Object { $_.Name -eq 'node.exe' -and $_.CommandLine -like "*$workspace*" } | Select-Object -ExpandProperty ProcessId; ` +
  `if ($targets) { Stop-Process -Id $targets -Force; Write-Output ('Stopped workspace Node processes: ' + ($targets -join ', ')) } else { Write-Output 'No workspace Node processes were running.' }`;

const result = spawnSync(
  "powershell",
  ["-NoProfile", "-Command", command],
  {
    cwd: workspaceRoot,
    encoding: "utf8"
  }
);

if (result.stdout) {
  process.stdout.write(result.stdout);
}

if (result.stderr) {
  process.stderr.write(result.stderr);
}

process.exit(result.status ?? 0);

