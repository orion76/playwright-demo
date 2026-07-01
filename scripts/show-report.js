const { spawnSync } = require("child_process");
const path = require("path");

const testFile = process.argv[2];
if (!testFile) {
  console.error("Usage: node scripts/show-report.js <test-file>");
  process.exit(1);
}

const testName = path.basename(testFile, ".spec.ts");
const testDir = path.dirname(testFile);
const reportDir = path.join(testDir, "report", testName);

spawnSync("npx", ["playwright", "show-report", reportDir], {
  stdio: "inherit",
  env: process.env,
});
