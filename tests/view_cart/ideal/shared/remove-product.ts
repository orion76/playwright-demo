import { Page } from "@playwright/test";
import { initPage } from "@src/pages/init";
import type { UViewport } from "@src/types";

export interface ScenarioOpts {
  viewport: UViewport;
  role: string;
  lang: string;
}

export async function testRemoveProduct(page: Page, opts: ScenarioOpts) {
  const po = initPage(page, "view_cart", opts.viewport);
  await po.navigate();
}
