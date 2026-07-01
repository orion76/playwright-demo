const { spawnSync } = require("child_process");
const fs = require("fs");
const path = require("path");

function findSpecFile(pattern) {
  const testsDir = path.resolve(__dirname, "..", "tests");
  const matches = [];
  const walk = (dir) => {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) walk(full);
      else if (entry.name.endsWith(".spec.ts") && entry.name.toLowerCase().includes(pattern.toLowerCase())) {
        matches.push(full);
      }
    }
  };
  walk(testsDir);
  return matches;
}

let specFile = process.argv[2];
if (!specFile) {
  console.error("Usage: npm run sht <spec-file-or-name>");
  console.error("  e.g. npm run sht tests/event/create/ideal/happy-path.spec.ts");
  console.error("  e.g. npm run sht happy-path");
  process.exit(1);
}

let specPath;
if (specFile.endsWith(".spec.ts")) {
  specPath = path.resolve(specFile);
} else {
  const matches = findSpecFile(specFile);
  if (matches.length === 0) {
    console.error(`No spec files matching "${specFile}"`);
    process.exit(1);
  }
  if (matches.length > 1) {
    console.log(`Multiple matches for "${specFile}":`);
    matches.forEach((m, i) => console.log(`  ${i + 1}. ${m}`));
  }
  specPath = matches[0];
  console.log(`Found: ${path.relative(process.cwd(), specPath)}`);
}

const traceDir = path.join(path.dirname(specPath), "trace");
if (!fs.existsSync(traceDir)) {
  console.error(`trace/ not found at ${traceDir}`);
  process.exit(1);
}

const base = path.basename(specPath, ".spec.ts").toLowerCase();
const traces = fs.readdirSync(traceDir).filter((f) => f.startsWith(base) && f.endsWith(".zip"));

if (traces.length === 0) {
  console.error(`No trace for ${base} in ${traceDir}`);
  process.exit(1);
}

if (traces.length > 1) {
  console.log("Multiple traces:");
  traces.forEach((t, i) => console.log(`  ${i + 1}. ${t}`));
}

const tracePath = path.join(traceDir, traces[0]);
console.log(`Opening: ${tracePath}`);
spawnSync("npx", ["playwright", "show-trace", tracePath], {
  stdio: "inherit",
  env: process.env,
});
