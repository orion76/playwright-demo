import { Page } from "@playwright/test";
import { initPage } from "@src/pages/init";
import type { UViewport } from "@src/types";

export interface ScenarioOpts {
  viewport: UViewport;
  role: string;
  lang: string;
}

export async function testRecommendedItems(page: Page, opts: ScenarioOpts) {
  const po = initPage(page, "/", opts.viewport);
  await po.navigate();

  await page.evaluate(() => {
    const el = document.querySelector('[class*="recommended"]');
    if (el) el.scrollIntoView({ behavior: "instant", block: "center" });
  });
  await page.waitForTimeout(1000);

  await page.locator(".recommended_items a:has-text('Add to cart')").first().click();
  await page.getByRole("link", { name: "View Cart" }).click();
  await page.waitForURL("**/view_cart");
}
