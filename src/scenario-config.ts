import fs from "fs";
import path from "path";
import { load } from "js-yaml";
import { getProjectRoot } from "./utils";
import type { URole, UViewport, ULanguage } from "./types";

export interface ScenarioCombination {
  viewport: UViewport;
  role: URole;
  lang: ULanguage;
}

export interface ScenarioConfig {
  combinations: ScenarioCombination[];
}

export function loadScenarioConfig(
  route: string,
  scenario: string
): ScenarioConfig {
  const promptPath = path.join(
    getProjectRoot(),
    "app",
    route,
    "spec",
    `${scenario}.prompt.md`
  );

  if (!fs.existsSync(promptPath)) {
    return { combinations: [] };
  }

  const content = fs.readFileSync(promptPath, "utf8");
  const frontmatter = extractYamlFrontmatter(content);

  if (!frontmatter) {
    return { combinations: [] };
  }

  try {
    return load(frontmatter) as ScenarioConfig;
  } catch {
    return { combinations: [] };
  }
}

function extractYamlFrontmatter(content: string): string | null {
  const match = content.match(/^---\s*\n([\s\S]*?)\n---/);
  return match ? match[1] : null;
}
