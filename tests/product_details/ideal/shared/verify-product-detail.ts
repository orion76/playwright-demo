import { Page, expect } from "@playwright/test";
import { initPage } from "@src/pages/init";
import { SITE_URL } from "@src/config";
import type { UViewport } from "@src/types";

export interface ScenarioOpts {
  viewport: UViewport;
  role: string;
  lang: string;
}

export async function testVerifyProductDetail(page: Page, opts: ScenarioOpts) {
  const po = initPage(page, "product_details", opts.viewport);
  await po.open(`${SITE_URL}/product_details/1`);

  const info = po.region("main").block("productInfo");
  await expect(info.element("productName")).toBeVisible();
  await expect(info.element("category")).toBeVisible();
  await expect(info.element("availability")).toBeVisible();
  await expect(info.element("condition")).toBeVisible();
  await expect(info.element("brand")).toBeVisible();
}
