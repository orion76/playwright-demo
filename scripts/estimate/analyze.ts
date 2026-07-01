import { readFileSync, readdirSync } from 'fs';
import { join } from 'path';
import { load } from 'js-yaml';
import type { ComplexityMetrics } from './types';
import { getProjectRoot } from '../../src/utils';

const APP_DIR = join(getProjectRoot(), 'app');

interface StructureYaml {
  regions?: { blocks?: { type: string; fields?: unknown[] }[] }[];
}

function countRegex(text: string, pattern: RegExp): number {
  const matches = text.match(pattern);
  return matches ? matches.length : 0;
}

export function analyzeComplexity(route: string): ComplexityMetrics {
  const routeDir = join(APP_DIR, route);

  // structure.yaml — regions, blocks, fields
  let structure: StructureYaml = {};
  try {
    structure = load(readFileSync(join(routeDir, 'structure.yaml'), 'utf-8')) as StructureYaml;
  } catch {
    // no structure file
  }

  const regions = structure.regions ?? [];
  const blocks = regions.flatMap((r) => r.blocks ?? []);
  const interactiveElements = blocks.reduce((sum, b) => sum + (b.fields?.length ?? 0), 0);

  const customControls = countRegex(
    JSON.stringify(structure),
    /datepicker|react-select|file-upload|rich-text|DatepickerControl|ReactSelectControl|FileUploadControl|RichTextControl/gi,
  );

  const filterDropdowns = blocks
    .flatMap((b) => b.fields ?? [])
    .filter(
      (f: any) =>
        f?.name?.toLowerCase().includes('filter') || f?.name?.toLowerCase().includes('dropdown'),
    ).length;

  // network.yaml — api endpoints
  let apiEndpoints = 0;
  try {
    const net = load(readFileSync(join(routeDir, 'network.yaml'), 'utf-8')) as any;
    if (net?.requests) apiEndpoints = net.requests.length;
  } catch {
    // no network file
  }

  // spec/<scenario>.md files — iframes, wizard steps, scenario steps
  let iframes = 0;
  let wizardSteps = 0;
  let scenarioSteps = 0;
  try {
    const specDir = join(routeDir, 'spec');
    const files = readdirSync(specDir).filter((f) => f.endsWith('.md') && !f.endsWith('.prompt.md'));
    for (const file of files) {
      const content = readFileSync(join(specDir, file), 'utf-8');
      iframes += countRegex(content, /iframe|TinyMCE|rich.text/i);
      wizardSteps += countRegex(content, /Шаг \d|Step \d|шаг \d/i);
      scenarioSteps += countRegex(content, /^\d+\. /gm);
    }
  } catch {
    // no spec directory
  }

  return {
    regions: regions.length,
    blocks: blocks.length,
    interactiveElements,
    iframes,
    customControls,
    apiEndpoints,
    filterDropdowns,
    wizardSteps: Math.max(wizardSteps, 1),
    scenarioSteps: Math.max(scenarioSteps, 1),
  };
}
