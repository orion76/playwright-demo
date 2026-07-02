import { test as base, expect } from "@playwright/test";
import { TEST_PLUGINS, VIEWPORTS, DEFAULT_VIEWPORT } from "../config";

export { expect, VIEWPORTS, DEFAULT_VIEWPORT };

let extended = base;

for (const [name, enabled] of Object.entries(TEST_PLUGINS)) {
  if (!enabled) continue;
  const { default: fixtures } = require(`./plugins/${name}`);
  extended = extended.extend(fixtures as Record<string, any>);
}

export const test = extended;
