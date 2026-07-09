import { test, Page, expect } from '@playwright/test';
import { initPage } from '@src/pages/init';
import type { UViewport } from '@src/types';

export interface ScenarioOpts {
  viewport: UViewport;
  role: string;
  lang: string;
}

export async function testViewCategoryProducts(page: Page, opts: ScenarioOpts) {
  const po = initPage(page, '/', opts.viewport);
  await po.navigate();

  await test.step('Expect Category title visible', async () => {
    const cat = po.region('sidebar').block('category');
    await expect(cat.element('title')).toBeVisible();
  });

  await test.step('Click Women category', async () => {
    const cat = po.region('sidebar').block('category');
    await cat.element('women').click();
    await expect(cat.element('womenSubCategory').first()).toBeVisible();
  });

  await test.step('Click Dress subcategory', async () => {
    const cat = po.region('sidebar').block('category');
    await cat.element('womenSubCategory').filter({ hasText: 'Dress' }).click();
    await page.waitForURL('**/category_products/*');
  });

  await test.step('Expect category page title visible', async () => {
    const prodPage = initPage(page, 'products', opts.viewport);
    await expect(
      prodPage.region('main').block('productList').element('categoryTitle'),
    ).toBeVisible();
  });

  await test.step('Click Men category', async () => {
    const cat = po.region('sidebar').block('category');
    await cat.element('men').click();
    await expect(cat.element('menSubCategory').first()).toBeVisible();
  });

  await test.step('Click a Men subcategory', async () => {
    const cat = po.region('sidebar').block('category');
    await cat.element('menSubCategory').filter({ hasText: 'Tshirts' }).first().click();
    await page.waitForURL('**/category_products/*');
  });
}
