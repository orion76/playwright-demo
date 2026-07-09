import { test, Page, expect } from '@playwright/test';
import { initPage } from '@src/pages/init';
import type { UViewport } from '@src/types';

export interface ScenarioOpts {
  viewport: UViewport;
  role: string;
  lang: string;
}

export async function testVerifyAllProducts(page: Page, opts: ScenarioOpts) {
  const po = initPage(page, 'products', opts.viewport);
  await po.navigate();

  await test.step('Expect All Products title visible', async () => {
    const list = po.region('main').block('productList');
    await expect(list.element('title')).toBeVisible();
  });

  await test.step('Click View Product on first item', async () => {
    await po.region('main').block('productList').element('viewProductLink').first().click();
    await page.waitForURL('**/product_details/**');
  });

  await test.step('Expect product details visible', async () => {
    const details = initPage(page, 'product_details', opts.viewport);
    const info = details.region('main').block('productInfo');
    await expect(info.element('productName')).toBeVisible();
    await expect(info.element('category')).toBeVisible();
    await expect(info.element('price')).toBeVisible();
    await expect(info.element('availability')).toBeVisible();
    await expect(info.element('condition')).toBeVisible();
    await expect(info.element('brand')).toBeVisible();
  });
}
