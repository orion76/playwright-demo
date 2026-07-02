import { Page } from "@playwright/test";
import { initPage } from "@src/pages/init";
import type { UViewport } from "@src/types";

export interface ScenarioOpts {
  viewport: UViewport;
  role: string;
  lang: string;
}

export async function testTestCasesNavigation(page: Page, opts: ScenarioOpts) {
  const po = initPage(page, "/", opts.viewport);
  await po.navigate();
  await po.region("header").block("nav").element("testCases").click();
  await page.waitForURL("**/test_cases");
}
