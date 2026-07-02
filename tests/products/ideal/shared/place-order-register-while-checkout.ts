import { Page, expect } from "@playwright/test";
import { initPage } from "@src/pages/init";
import type { UViewport } from "@src/types";

export interface ScenarioOpts {
  viewport: UViewport;
  role: string;
  lang: string;
}

export async function testPlaceOrderRegisterWhileCheckout(page: Page, opts: ScenarioOpts) {
  const po = initPage(page, "products", opts.viewport);
  await po.navigate();
  await expect(po.region("main").block("productList").element("title")).toBeVisible();
}
