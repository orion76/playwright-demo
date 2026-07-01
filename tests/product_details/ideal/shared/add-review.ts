import { Page, expect } from "@playwright/test";
import { initPage } from "@src/pages/init";
import { SITE_URL } from "@src/config";
import type { UViewport } from "@src/types";

export interface ScenarioOpts {
  viewport: UViewport;
  role: string;
  lang: string;
}

export async function testAddReview(page: Page, opts: ScenarioOpts) {
  const po = initPage(page, "product_details", opts.viewport);
  await po.open(`${SITE_URL}/product_details/1`);

  const review = po.region("main").block("review");
  await review.element("nameInput").fill("TestUser");
  await review.element("emailInput").fill("test@example.com");
  await review.element("reviewInput").fill("Great product!");
  await review.element("submitBtn").click();

  await expect(page.getByText("Thank you for your review.")).toBeVisible();
}
