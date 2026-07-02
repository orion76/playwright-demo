import { readFileSync, existsSync } from "fs";
import { resolve } from "path";
import { load } from "js-yaml";
import { Request } from "@playwright/test";

// Load app config
const configPath = resolve(__dirname, "..", "app", "config.yml");
let rawConfig: Record<string, unknown> = {};
if (existsSync(configPath)) {
  try {
    rawConfig = (load(readFileSync(configPath, "utf-8")) as Record<string, unknown>) || {};
  } catch {
    // ignore
  }
}

const languagesRaw = (rawConfig.languages || []) as { id: string; label?: string; default?: boolean }[];

export const LANGUAGES = languagesRaw.map((l) => l.id);
export const DEFAULT_LANGUAGE = languagesRaw.find((l) => l.default)?.id || LANGUAGES[0] || "en";

export const SITE_URL = process.env.SITE_URL || "https://automationexercise.com";

export const HAR_PATH = "data/api-only.har";

const testPluginsRaw = rawConfig.test_plugins as Record<string, boolean> | undefined;
export const TEST_PLUGINS: Record<string, boolean> = testPluginsRaw || {};

type ViewportRaw = { width: number; height: number; default?: boolean };
const viewportsRaw = rawConfig.viewports as Record<string, ViewportRaw> | undefined;

export const VIEWPORTS: Record<string, { width: number; height: number }> = {};
let defaultViewportKey = "desktop";

if (viewportsRaw) {
  for (const [key, vp] of Object.entries(viewportsRaw)) {
    VIEWPORTS[key] = { width: vp.width, height: vp.height };
    if (vp.default) defaultViewportKey = key;
  }
}

export const DEFAULT_VIEWPORT = VIEWPORTS[defaultViewportKey] || { width: 1440, height: 900 };

export function isBackendRequest(request: Request, route?: string) {
  const host = new URL(SITE_URL).host;
  const url = request.url();
  if (route) {
    return url.includes(host + "/" + route.replace(/^\//, ""));
  }
  return url.includes(host);
}
