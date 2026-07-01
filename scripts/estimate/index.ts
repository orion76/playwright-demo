import { analyzeComplexity } from "./analyze";
import { readStats, appendRecord } from "./stats";
import { estimate } from "./forecast";
import type { TestDebugRecord, ComplexityMetrics } from "./types";

function printUsage() {
  console.log(`
Usage:
  npx tsx scripts/estimate/index.ts <route> [--save]

Commands:
  <route>         Analyze route and show forecast (e.g. event/create)
  --save          After debugging, manually save a record (interactive)

Examples:
  npx tsx scripts/estimate/index.ts event/create
  npx tsx scripts/estimate/index.ts events
`);
}

async function main() {
  const args = process.argv.slice(2);

  if (args.length === 0 || args[0] === "--help") {
    printUsage();
    process.exit(0);
  }

  const route = args[0];
  const saveMode = args.includes("--save");

  console.log(`\n📊 Analyzing route: ${route}\n`);

  const metrics = analyzeComplexity(route);

  printComplexity(metrics);

  const history = readStats();
  const forecast = estimate(metrics, history.records);

  printForecast(forecast);

  if (saveMode) {
    await saveRecordInteractive(route, metrics);
  }

  console.log("");
}

function printComplexity(m: ComplexityMetrics) {
  console.log("Complexity Metrics:");
  console.log(`  Regions:            ${m.regions}`);
  console.log(`  Blocks:             ${m.blocks}`);
  console.log(`  Interactive elems:  ${m.interactiveElements}`);
  console.log(`  Iframes:            ${m.iframes}`);
  console.log(`  Custom controls:    ${m.customControls}`);
  console.log(`  API endpoints:      ${m.apiEndpoints}`);
  console.log(`  Filter dropdowns:   ${m.filterDropdowns}`);
  console.log(`  Wizard steps:       ${m.wizardSteps}`);
  console.log(`  Scenario steps:     ${m.scenarioSteps}`);
  console.log("");
}

function printForecast(f: {
  estimatedMinutes: number;
  estimatedCost: number;
  estimatedIterations: number;
  confidence: number;
  similarTests: number;
  calibrationFactor: number;
}) {
  console.log("Forecast:");
  console.log(`  Estimated time:     ${f.estimatedMinutes} min`);
  console.log(`  Estimated cost:     $${f.estimatedCost}`);
  console.log(`  Estimated iters:    ${f.estimatedIterations}`);
  console.log(`  Confidence:         ${(f.confidence * 100).toFixed(0)}%`);
  console.log(`  Similar tests:      ${f.similarTests}`);
  console.log(`  Calibration factor: ${f.calibrationFactor}`);
  console.log(`  Global multiplier:  3 (manual)`);
}

async function saveRecordInteractive(
  route: string,
  complexity: ComplexityMetrics
) {
  console.log("Enter debug stats for this route:");
  const rl = {
    question: (prompt: string): Promise<string> => {
      process.stdout.write(prompt);
      return new Promise((resolve) => {
        process.stdin.once("data", (data) =>
          resolve(data.toString().trim())
        );
      });
    },
  };

  const durationMs =
    parseInt(await rl.question("  Total duration (ms): ")) || 0;
  const cost = parseFloat(await rl.question("  Total cost ($): ")) || 0;
  const iterations =
    parseInt(await rl.question("  Iterations to green: ")) || 1;
  const toolCalls = parseInt(await rl.question("  Tool calls: ")) || 0;
  const errors = parseInt(await rl.question("  Errors: ")) || 0;

  const record: TestDebugRecord = {
    route,
    scenario: "*",
    complexity,
    totalDurationMs: durationMs,
    totalCost: cost,
    iterations,
    toolCalls,
    errors,
    timestamp: new Date().toISOString(),
  };

  const { appendRecord: save } = await import("./stats");
  save(record);
  console.log("  ✅ Record saved to .opencode-logs/test-stats.yaml");
}

main().catch((err) => {
  console.error("Error:", err);
  process.exit(1);
});
