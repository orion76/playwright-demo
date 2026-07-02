import { Page, expect } from "@playwright/test";
import { initPage } from "@src/pages/init";
import type { UViewport } from "@src/types";

export interface ScenarioOpts {
  viewport: UViewport;
  role: string;
  lang: string;
}

export async function testPlaceOrderRegisterBeforeCheckout(page: Page, opts: ScenarioOpts) {
  const po = initPage(page, "login", opts.viewport);
  await po.navigate();
  await expect(po.region("main").block("signupForm").element("title")).toBeVisible();
}
