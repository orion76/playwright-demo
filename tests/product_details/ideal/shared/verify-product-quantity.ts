import { test, Page, expect } from '@playwright/test';
import { initPage } from '@src/pages/init';
import { SITE_URL } from '@src/config';
import type { UViewport } from '@src/types';

export interface ScenarioOpts {
  viewport: UViewport;
  role: string;
  lang: string;
}

export async function testVerifyProductQuantity(page: Page, opts: ScenarioOpts) {
  const po = initPage(page, 'product_details', opts.viewport);
  await po.open(`${SITE_URL}/product_details/1`);

  await test.step('Expect product name visible', async () => {
    const info = po.region('main').block('productInfo');
    await expect(info.element('productName')).toBeVisible();
  });

  await test.step('Increase quantity to 4', async () => {
    const info = po.region('main').block('productInfo');
    await info.element('quantityInput').fill('4');
    await expect(info.element('quantityInput')).toHaveValue('4');
  });

  await test.step('Add to cart and view cart', async () => {
    const info = po.region('main').block('productInfo');
    await info.element('addToCartBtn').click();
    await info.element('viewCartLink').click();
    await page.waitForURL('**/view_cart');
  });

  await test.step('Expect product quantity is 4 in cart', async () => {
    const cart = initPage(page, 'view_cart', opts.viewport);
    await expect(cart.region('main').block('cartContent').element('quantityCell')).toContainText(
      '4',
    );
  });
}
