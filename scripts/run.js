const { spawnSync } = require("child_process");
const path = require("path");

const route = process.argv[2];
const type = process.argv[3] || "ideal";

if (!route) {
  console.error("Usage: node scripts/run.js <route> [type]");
  console.error("  e.g. node scripts/run.js event/create ideal");
  console.error("  e.g. node scripts/run.js event/create plan");
  console.error("  e.g. node scripts/run.js profile/tickets ideal");
  process.exit(1);
}

const testDir = path.resolve(__dirname, "..", "tests", route);
const reportDir = path.join(testDir, "report", type);
const traceDir = path.join(testDir, "trace");

if (type === "ideal") {
  spawnSync(
    "npx",
    [
      "playwright", "test", path.join(testDir, "ideal"),
      "--reporter", "list,html",
    ],
    {
      stdio: "inherit",
      env: { ...process.env, PLAYWRIGHT_HTML_REPORT: reportDir },
    },
  );
} else {
  spawnSync("npx", ["playwright", "test", path.join(testDir, `plan--*.spec.ts`), "--reporter", "list"], {
    stdio: "inherit",
    env: process.env,
  });
}
