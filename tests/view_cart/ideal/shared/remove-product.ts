import { test, Page, expect } from '@playwright/test';
import { initPage } from '@src/pages/init';
import type { UViewport } from '@src/types';

export interface ScenarioOpts {
  viewport: UViewport;
  role: string;
  lang: string;
}

export async function testRemoveProduct(page: Page, opts: ScenarioOpts) {
  const productsPage = initPage(page, 'products', opts.viewport);
  await productsPage.navigate();

  await test.step('Add product to cart first', async () => {
    const list = productsPage.region('main').block('productList');
    await list.element('addToCartBtn').first().click();
    await expect(list.element('viewCartInModal')).toBeVisible();
    await list.element('viewCartInModal').click();
    await page.waitForURL('**/view_cart');
  });

  await test.step('Expect cart table visible', async () => {
    const cart = initPage(page, 'view_cart', opts.viewport);
    const content = cart.region('main').block('cartContent');
    await expect(content.element('cartTable')).toBeVisible();
  });

  await test.step('Remove product from cart', async () => {
    const cart = initPage(page, 'view_cart', opts.viewport);
    const content = cart.region('main').block('cartContent');
    await content.element('deleteItem').first().click();
    await page.waitForTimeout(1000);
  });

  await test.step('Expect cart is empty', async () => {
    const cart = initPage(page, 'view_cart', opts.viewport);
    const content = cart.region('main').block('cartContent');
    await expect(content.element('emptyCartLink')).toBeVisible();
  });
}
