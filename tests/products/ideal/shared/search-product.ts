import { test, Page, expect } from '@playwright/test';
import { initPage } from '@src/pages/init';
import type { UViewport } from '@src/types';

export interface ScenarioOpts {
  viewport: UViewport;
  role: string;
  lang: string;
}

export async function testSearchProduct(page: Page, opts: ScenarioOpts) {
  const po = initPage(page, 'products', opts.viewport);
  await po.navigate();

  await test.step('Search for product', async () => {
    const search = po.region('main').block('search');
    await search.element('searchInput').fill('Blue Top');
    await expect(search.element('searchInput')).toHaveValue('Blue Top');
    await search.element('searchBtn').click();
  });

  await test.step('Expect SEARCHED PRODUCTS title visible', async () => {
    await expect(po.region('main').block('productList').element('searchedTitle')).toBeVisible();
  });

  await test.step('Expect search results visible', async () => {
    const list = po.region('main').block('productList');
    await expect(list.element('addToCartBtn').first()).toBeVisible();
  });
}
