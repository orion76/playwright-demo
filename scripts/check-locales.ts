import { readFileSync, readdirSync, existsSync, mkdirSync, writeFileSync } from "fs";
import { join } from "path";
import { dump, load } from "js-yaml";
import { getProjectRoot } from "../src/utils";

const APP_DIR = join(getProjectRoot(), "app");
const LOG_DIR = ".opencode-logs";

interface LocaleEntry {
  file: string;
  path: string;
  en: string;
  he: string;
}

function collectLocaleFiles(dir: string): string[] {
  const files: string[] = [];
  const entries = readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...collectLocaleFiles(full));
    } else if (entry.name === "locales.yaml") {
      files.push(full);
    }
  }
  return files;
}

function flattenYaml(
  obj: unknown,
  prefix: string,
  file: string,
  results: LocaleEntry[]
) {
  if (!obj || typeof obj !== "object") return;
  for (const [key, value] of Object.entries(obj)) {
    const currentPath = prefix ? `${prefix}.${key}` : key;
    if (
      value &&
      typeof value === "object" &&
      !Array.isArray(value) &&
      "en" in value &&
      "he" in value
    ) {
      const entry = value as { en: string; he: string };
      if (entry.en === entry.he) {
        results.push({
          file,
          path: currentPath,
          en: entry.en,
          he: entry.he,
        });
      }
    } else {
      flattenYaml(value, currentPath, file, results);
    }
  }
}

function saveToFile(issues: LocaleEntry[]) {
  if (!existsSync(LOG_DIR)) mkdirSync(LOG_DIR, { recursive: true });
  const logFile = join(LOG_DIR, "locale-issues.yaml");

  const data = {
    date: new Date().toISOString().slice(0, 10),
    total: issues.length,
    issues,
  };

  const yaml = dump(data, { lineWidth: 120, noRefs: true });
  writeFileSync(logFile, yaml, "utf-8");
  return logFile;
}

function main() {
  const files = collectLocaleFiles(APP_DIR);
  const allIssues: LocaleEntry[] = [];

  for (const file of files) {
    try {
      const content = readFileSync(file, "utf-8");
      const data = load(content);
      const relPath = file.replace(APP_DIR + "/", "");
      flattenYaml(data, "", relPath, allIssues);
    } catch (err) {
      console.error(`Error reading ${file}: ${err}`);
    }
  }

  if (allIssues.length === 0) {
    console.log("All translations have distinct EN and HE values.");
    return;
  }

  const logFile = saveToFile(allIssues);

  console.log(`Found ${allIssues.length} entries where EN === HE:\n`);
  for (const issue of allIssues) {
    console.log(`  ${issue.file}`);
    console.log(`    ${issue.path}`);
    console.log(`    value: "${issue.en}"`);
    console.log("");
  }
  console.log(`Saved to: ${logFile}`);
}

main();
