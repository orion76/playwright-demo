const { spawnSync } = require("child_process");
const path = require("path");

const testFile = process.argv[2];
if (!testFile) {
  console.error("Usage: node scripts/run-with-report.js <test-file> [-- <extra-playwright-args>]");
  process.exit(1);
}

const testName = path.basename(testFile, ".spec.ts");
const testDir = path.dirname(testFile);
const reportDir = path.join(testDir, "report", testName);

console.log(`📁 Report → ${reportDir}/`);

const args = ["playwright", "test", testFile, "--reporter=list,html", ...process.argv.slice(3)];

const result = spawnSync("npx", args, {
  stdio: "inherit",
  env: { ...process.env, PLAYWRIGHT_HTML_REPORT: reportDir },
});

process.exit(result.status);
