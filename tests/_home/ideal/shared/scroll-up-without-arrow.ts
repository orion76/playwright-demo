import { Page, expect } from "@playwright/test";
import { initPage } from "@src/pages/init";
import type { UViewport } from "@src/types";

export interface ScenarioOpts {
  viewport: UViewport;
  role: string;
  lang: string;
}

export async function testScrollUpWithoutArrow(page: Page, opts: ScenarioOpts) {
  const po = initPage(page, "/", opts.viewport);
  await po.navigate();

  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await expect(page.getByText("Subscription")).toBeVisible();
  await page.evaluate(() => window.scrollTo(0, 0));
}
