import { test, Page, expect } from '@playwright/test';
import { initPage } from '@src/pages/init';
import type { UViewport } from '@src/types';

export interface ScenarioOpts {
  viewport: UViewport;
  role: string;
  lang: string;
}

export async function testDownloadInvoiceAfterPurchase(page: Page, opts: ScenarioOpts) {
  const po = initPage(page, 'products', opts.viewport);
  await po.navigate();

  await test.step('Expect All Products title', async () => {
    const list = po.region('main').block('productList');
    await expect(list.element('title')).toBeVisible();
  });

  await test.step('Add products to cart and go to cart', async () => {
    const list = po.region('main').block('productList');
    await list.element('addToCartBtn').first().click();
    await expect(list.element('viewCartInModal')).toBeVisible();
    await list.element('viewCartInModal').click();
    await page.waitForURL('**/view_cart');
  });

  await test.step('Click Proceed To Checkout', async () => {
    const cart = initPage(page, 'view_cart', opts.viewport);
    const content = cart.region('main').block('cartContent');
    await content.element('checkoutBtn').click();
  });

  await test.step('Click Register / Login from modal', async () => {
    const cart = initPage(page, 'view_cart', opts.viewport);
    await cart.region('main').block('cartContent').element('registerLoginBtn').click();
    await page.waitForURL('**/login');
  });
}
