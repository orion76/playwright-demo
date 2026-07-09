import { test, Page, expect } from '@playwright/test';
import { initPage } from '@src/pages/init';
import type { UViewport } from '@src/types';

export interface ScenarioOpts {
  viewport: UViewport;
  role: string;
  lang: string;
}

export async function testAddProductsInCart(page: Page, opts: ScenarioOpts) {
  const po = initPage(page, 'products', opts.viewport);
  await po.navigate();

  await test.step('Expect All Products title visible', async () => {
    const list = po.region('main').block('productList');
    await expect(list.element('title')).toBeVisible();
  });

  await test.step('Add first product to cart', async () => {
    await page.evaluate(() => {
      const btn = document.querySelector<HTMLElement>('a[data-product-id="1"]');
      if (btn) btn.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });
    await page.waitForTimeout(1000);
    const list = po.region('main').block('productList');
    await expect(list.element('continueShopping')).toBeVisible();
    await list.element('continueShopping').click();
  });

  await test.step('Add second product to cart', async () => {
    await page.evaluate(() => {
      const btn = document.querySelector<HTMLElement>('a[data-product-id="2"]');
      if (btn) btn.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });
    await page.waitForTimeout(1000);
    const list = po.region('main').block('productList');
    await expect(list.element('viewCartInModal')).toBeVisible();
    await list.element('viewCartInModal').click();
    await page.waitForURL('**/view_cart');
  });

  await test.step('Expect both products in cart', async () => {
    const cart = initPage(page, 'view_cart', opts.viewport);
    const content = cart.region('main').block('cartContent');
    await expect(content.element('cartRows')).toHaveCount(2);
  });
}
