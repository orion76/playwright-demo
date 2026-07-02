import { Page, expect } from "@playwright/test";
import { initPage } from "@src/pages/init";
import { SITE_URL } from "@src/config";
import type { UViewport } from "@src/types";

export interface ScenarioOpts {
  viewport: UViewport;
  role: string;
  lang: string;
}

export async function testVerifyProductQuantity(page: Page, opts: ScenarioOpts) {
  const po = initPage(page, "product_details", opts.viewport);
  await po.open(`${SITE_URL}/product_details/1`);
  await expect(po.region("main").block("productInfo").element("productName")).toBeVisible();

  await page.locator("input#quantity").fill("4");
  await page.getByRole("button", { name: "Add to cart" }).click();
  await page.getByRole("link", { name: "View Cart" }).click();
  await page.waitForURL("**/view_cart");
}
