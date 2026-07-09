import { test, Page, expect } from '@playwright/test';
import { initPage } from '@src/pages/init';
import type { UViewport } from '@src/types';

export interface ScenarioOpts {
  viewport: UViewport;
  role: string;
  lang: string;
}

export async function testRecommendedItems(page: Page, opts: ScenarioOpts) {
  const po = initPage(page, '/', opts.viewport);
  await po.navigate();

  await test.step('Scroll to recommended items', async () => {
    await page.evaluate(() => {
      const el = document.querySelector('[class*="recommended"]');
      if (el) el.scrollIntoView({ behavior: 'instant', block: 'center' });
    });
    await page.waitForTimeout(1000);
  });

  await test.step('Expect recommended items title visible', async () => {
    const items = po.region('main').block('recommendedItems');
    await expect(items.element('title')).toBeVisible();
  });

  await test.step('Add to cart and view cart', async () => {
    const items = po.region('main').block('recommendedItems');
    await items.element('addToCartBtn').first().click();
    await items.element('viewCartLink').click();
    await page.waitForURL('**/view_cart');
  });
}
