import { test, Page, expect } from '@playwright/test';
import { initPage } from '@src/pages/init';
import type { UViewport } from '@src/types';

export interface ScenarioOpts {
  viewport: UViewport;
  role: string;
  lang: string;
}

export async function testViewBrandProducts(page: Page, opts: ScenarioOpts) {
  const po = initPage(page, 'products', opts.viewport);
  await po.navigate();

  await test.step('Expect Brands title visible', async () => {
    const brands = po.region('sidebar').block('brands');
    await expect(brands.element('title')).toBeVisible();
  });

  await test.step('Click first brand and verify', async () => {
    const brands = po.region('sidebar').block('brands');
    await brands.element('polo').click();
    await page.waitForURL('**/brand_products/**');
    const list = po.region('main').block('productList');
    await expect(list.element('addToCartBtn').first()).toBeVisible();
  });

  await test.step('Click second brand and verify', async () => {
    const brands = po.region('sidebar').block('brands');
    await brands.element('hm').click();
    await page.waitForURL('**/brand_products/**');
    const list = po.region('main').block('productList');
    await expect(list.element('addToCartBtn').first()).toBeVisible();
  });
}
