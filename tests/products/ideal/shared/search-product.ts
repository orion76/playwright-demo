import { Page } from "@playwright/test";
import { initPage } from "@src/pages/init";
import type { UViewport } from "@src/types";

export interface ScenarioOpts {
  viewport: UViewport;
  role: string;
  lang: string;
}

export async function testSearchProduct(page: Page, opts: ScenarioOpts) {
  const po = initPage(page, "products", opts.viewport);
  await po.navigate();

  const search = po.region("main").block("search");
  await search.element("searchInput").fill("Blue Top");
  await search.element("searchBtn").click();
}
