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

export function isBackendRequest(request: Request, route?: string) {
  const host = new URL(SITE_URL).host;
  const url = request.url();
  if (route) {
    return url.includes(host + "/" + route.replace(/^\//, ""));
  }
  return url.includes(host);
}
