import { Page, expect } from "@playwright/test";
import { initPage } from "@src/pages/init";
import type { UViewport } from "@src/types";

export interface ScenarioOpts {
  viewport: UViewport;
  role: string;
  lang: string;
}

export async function testSubscription(page: Page, opts: ScenarioOpts) {
  const po = initPage(page, "_home", opts.viewport);
  await po.navigate();

  const sub = po.region("footer").block("subscription");
  await expect(sub.element("title")).toBeVisible();
  await sub.element("emailInput").fill("subscribe@test.com");
  await sub.element("subscribeBtn").click();
}
