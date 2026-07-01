export interface ComplexityMetrics {
  regions: number;
  blocks: number;
  interactiveElements: number;
  iframes: number;
  customControls: number;
  apiEndpoints: number;
  filterDropdowns: number;
  wizardSteps: number;
  scenarioSteps: number;
}

export interface TestDebugRecord {
  route: string;
  scenario: string;
  complexity: ComplexityMetrics;
  totalDurationMs: number;
  totalCost: number;
  iterations: number;
  toolCalls: number;
  errors: number;
  timestamp: string;
}

export interface TestStatsStore {
  records: TestDebugRecord[];
}

export interface Forecast {
  route: string;
  complexity: ComplexityMetrics;
  estimatedMinutes: number;
  estimatedCost: number;
  estimatedIterations: number;
  confidence: number;
  similarTests: number;
  calibrationFactor: number;
}

export interface ElementCoefficients {
  globalMultiplier: number;
  perRegion: number;
  perBlock: number;
  perElement: number;
  perIframe: number;
  perCustomControl: number;
  perApiEndpoint: number;
  perFilterDropdown: number;
  perWizardStep: number;
  perScenarioStep: number;
  version: number;
}

export const DEFAULT_COEFFICIENTS: ElementCoefficients = {
  globalMultiplier: 3,
  perRegion: 3,
  perBlock: 2,
  perElement: 1.5,
  perIframe: 8,
  perCustomControl: 5,
  perApiEndpoint: 1,
  perFilterDropdown: 2,
  perWizardStep: 1.5,
  perScenarioStep: 0.5,
  version: 1,
};

export const COEFFICIENTS_FILE = ".opencode-logs/estimate-coefficients.yaml";
