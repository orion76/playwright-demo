import { existsSync, readFileSync, writeFileSync } from "fs";
import { load, dump } from "js-yaml";
import type {
  ComplexityMetrics,
  Forecast,
  TestDebugRecord,
  ElementCoefficients,
} from "./types";
import { DEFAULT_COEFFICIENTS, COEFFICIENTS_FILE } from "./types";

export function complexityWeight(
  m: ComplexityMetrics,
  coef: ElementCoefficients = DEFAULT_COEFFICIENTS
): number {
  return (
    m.regions * coef.perRegion +
    m.blocks * coef.perBlock +
    m.interactiveElements * coef.perElement +
    m.iframes * coef.perIframe +
    m.customControls * coef.perCustomControl +
    m.apiEndpoints * coef.perApiEndpoint +
    m.filterDropdowns * coef.perFilterDropdown +
    m.wizardSteps * coef.perWizardStep +
    m.scenarioSteps * coef.perScenarioStep
  );
}

export function rawMinutes(m: ComplexityMetrics, coef?: ElementCoefficients): number {
  const c = coef ?? DEFAULT_COEFFICIENTS;
  return complexityWeight(m, c) * c.globalMultiplier;
}

export function readCoefficients(): ElementCoefficients {
  if (!existsSync(COEFFICIENTS_FILE)) return { ...DEFAULT_COEFFICIENTS };
  try {
    const doc = load(readFileSync(COEFFICIENTS_FILE, "utf-8")) as any;
    if (doc && doc.version) {
      return { ...DEFAULT_COEFFICIENTS, ...doc };
    }
  } catch {
    // ignore
  }
  return { ...DEFAULT_COEFFICIENTS };
}

export function saveCoefficients(coef: ElementCoefficients): void {
  const yaml = dump(coef, { lineWidth: 120, noRefs: true });
  writeFileSync(COEFFICIENTS_FILE, yaml, "utf-8");
}

/**
 * After a test completes, refine coefficients based on actual vs predicted.
 * Uses exponential smoothing: new = old * (1 - rate) + derived * rate
 */
export function refineCoefficients(
  actual: TestDebugRecord,
  current: ElementCoefficients
): ElementCoefficients {
  const predicted = rawMinutes(actual.complexity, current);
  const actualMin = actual.totalDurationMs / 60000;
  if (predicted <= 0 || actualMin <= 0) return current;
  const ratio = actualMin / predicted;

  // Smoothing rate — how fast we adapt (0.1 = slow, 0.3 = fast)
  const rate = 0.15;

  // Distribute the ratio across all non-zero coefficients proportionally
  const c = actual.complexity;
  const updated = { ...current, version: current.version + 1 };

  // globalMultiplier is set manually by the user — skip auto-refine
  const PER_ELEMENT_KEYS: (keyof ElementCoefficients)[] = [
    "perRegion", "perBlock", "perElement", "perIframe", "perCustomControl",
    "perApiEndpoint", "perFilterDropdown", "perWizardStep", "perScenarioStep",
  ];

  const adjust = (key: keyof ElementCoefficients, count: number) => {
    if (count <= 0 || typeof updated[key] !== "number") return;
    const contribution = (updated[key] as number) * count / predicted;
    const derived = (current[key] as number) * ratio;
    updated[key] = Math.round(
      ((updated[key] as number) * (1 - rate) + derived * rate) * 10
    ) / 10;
  };

  for (const key of PER_ELEMENT_KEYS) {
    const countMap: Record<string, number> = {
      perRegion: c.regions,
      perBlock: c.blocks,
      perElement: c.interactiveElements,
      perIframe: c.iframes,
      perCustomControl: c.customControls,
      perApiEndpoint: c.apiEndpoints,
      perFilterDropdown: c.filterDropdowns,
      perWizardStep: c.wizardSteps,
      perScenarioStep: c.scenarioSteps,
    };
    adjust(key, countMap[key]);
  }

  return updated;
}

export function calibrationFactor(history: TestDebugRecord[]): number {
  const coef = readCoefficients();
  let totalPredicted = 0;
  let totalActual = 0;
  for (const r of history) {
    const p = rawMinutes(r.complexity, coef);
    const a = r.totalDurationMs / 60000;
    if (p > 0 && a > 0) {
      totalPredicted += p;
      totalActual += a;
    }
  }
  if (totalPredicted <= 0) return 1;
  return Math.round((totalActual / totalPredicted) * 100) / 100;
}

function isSimilarWeight(m: ComplexityMetrics, t: ComplexityMetrics, coef: ElementCoefficients): boolean {
  const wm = complexityWeight(m, coef);
  const wt = complexityWeight(t, coef);
  if (wm === 0 && wt === 0) return true;
  return Math.abs(wm - wt) / Math.max(wm, wt, 1) <= 0.3;
}

export function estimate(
  complexity: ComplexityMetrics,
  history: TestDebugRecord[]
): Forecast {
  const coef = readCoefficients();
  const similar = history.filter((r) => isSimilarWeight(complexity, r.complexity, coef));
  const n = similar.length;

  const raw = rawMinutes(complexity, coef);
  const factor = calibrationFactor(history);
  const adjustedMinutes = Math.round(raw * factor);

  if (n === 0) {
    const costPerMin = 0.02;
    return {
      estimatedMinutes: adjustedMinutes,
      estimatedCost: Math.round(adjustedMinutes * costPerMin * 100) / 100,
      estimatedIterations: Math.max(1, Math.ceil(adjustedMinutes / 10)),
      confidence: 0.2,
      similarTests: 0,
      calibrationFactor: factor,
    };
  }

  const avgCost = similar.reduce((s, r) => s + r.totalCost, 0) / n;
  const avgIterations = similar.reduce((s, r) => s + r.iterations, 0) / n;

  const confidence = Math.min(0.9, 0.3 + n * 0.1);

  return {
    estimatedMinutes: adjustedMinutes,
    estimatedCost: Math.round(avgCost * 100) / 100,
    estimatedIterations: Math.ceil(avgIterations),
    confidence: Math.round(confidence * 100) / 100,
    similarTests: n,
    calibrationFactor: factor,
  };
}
