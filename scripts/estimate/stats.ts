import { existsSync, readFileSync, appendFileSync, mkdirSync } from "fs";
import { join } from "path";
import { load, dump } from "js-yaml";
import type { TestDebugRecord, TestStatsStore } from "./types";
import { refineCoefficients, readCoefficients, saveCoefficients } from "./forecast";

const LOG_DIR = ".opencode-logs";
const STATS_FILE = join(LOG_DIR, "test-stats.yaml");

function ensureDir(dir: string) {
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
}

function loadAll(text: string): unknown[] {
  const docs: unknown[] = [];
  const lines = text.split("\n");
  let currentDoc: string[] = [];
  for (const line of lines) {
    if (line.trim() === "---" && currentDoc.length > 0) {
      const doc = load(currentDoc.join("\n"));
      if (doc) docs.push(doc);
      currentDoc = [];
    } else {
      currentDoc.push(line);
    }
  }
  if (currentDoc.length > 0) {
    const doc = load(currentDoc.join("\n"));
    if (doc) docs.push(doc);
  }
  return docs;
}

export function readStats(): TestStatsStore {
  if (!existsSync(STATS_FILE)) return { records: [] };

  const text = readFileSync(STATS_FILE, "utf-8");
  const docs = loadAll(text);
  const all: TestDebugRecord[] = [];
  for (const doc of docs) {
    if (doc && typeof doc === "object" && "records" in doc) {
      const store = doc as TestStatsStore;
      if (Array.isArray(store.records)) all.push(...store.records);
    }
  }
  return { records: all };
}

export function appendRecord(record: TestDebugRecord): void {
  ensureDir(LOG_DIR);
  const isNew = !existsSync(STATS_FILE);
  if (isNew) {
    const header = `# Test Debug Stats — ${new Date().toISOString().slice(0, 10)}\n`;
    appendFileSync(STATS_FILE, header, "utf-8");
  }

  // Save the record
  const yaml = dump({ records: [record] }, { lineWidth: 120, noRefs: true });
  appendFileSync(STATS_FILE, `---\n${yaml}`, "utf-8");

  // Auto-refine coefficients
  const current = readCoefficients();
  const updated = refineCoefficients(record, current);
  saveCoefficients(updated);
}
