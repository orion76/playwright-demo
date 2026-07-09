import { test, Page, expect } from '@playwright/test';
import { initPage } from '@src/pages/init';
import type { UViewport } from '@src/types';

export interface ScenarioOpts {
  viewport: UViewport;
  role: string;
  lang: string;
}

export async function testSearchProductsVerifyCartAfterLogin(page: Page, opts: ScenarioOpts) {
  const po = initPage(page, 'products', opts.viewport);
  await po.navigate();

  await test.step('Search for product', async () => {
    const search = po.region('main').block('search');
    await search.element('searchInput').fill('Blue Top');
    await expect(search.element('searchInput')).toHaveValue('Blue Top');
    await search.element('searchBtn').click();
  });

  await test.step('Expect SEARCHED PRODUCTS title', async () => {
    await expect(po.region('main').block('productList').element('searchedTitle')).toBeVisible();
  });

  await test.step('Add found products to cart and view cart', async () => {
    const list = po.region('main').block('productList');
    await list.element('addToCartBtn').first().click();
    await expect(list.element('viewCartInModal')).toBeVisible();
    await list.element('viewCartInModal').click();
    await page.waitForURL('**/view_cart');
  });

  await test.step('Expect products in cart', async () => {
    const cart = initPage(page, 'view_cart', opts.viewport);
    const content = cart.region('main').block('cartContent');
    await expect(content.element('cartRows')).toHaveCount(1);
  });

  await test.step('Click Proceed To Checkout and check modal', async () => {
    const cart = initPage(page, 'view_cart', opts.viewport);
    const content = cart.region('main').block('cartContent');
    await content.element('checkoutBtn').click();
    await expect(content.element('registerLoginBtn')).toBeVisible({ timeout: 5000 });
  });
}
