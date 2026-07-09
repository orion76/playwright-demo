import { test, Page, expect } from '@playwright/test';
import { initPage } from '@src/pages/init';
import { SITE_URL } from '@src/config';
import type { UViewport } from '@src/types';

export interface ScenarioOpts {
  viewport: UViewport;
  role: string;
  lang: string;
}

export async function testAddReview(page: Page, opts: ScenarioOpts) {
  const po = initPage(page, 'product_details', opts.viewport);
  await po.open(`${SITE_URL}/product_details/1`);

  await test.step('Expect Write Your Review title visible', async () => {
    const review = po.region('main').block('review');
    await expect(review.element('title')).toBeVisible();
  });

  await test.step('Fill review form', async () => {
    const review = po.region('main').block('review');
    await review.element('nameInput').fill('TestUser');
    await expect(review.element('nameInput')).toHaveValue('TestUser');
    await review.element('emailInput').fill('test@example.com');
    await expect(review.element('emailInput')).toHaveValue('test@example.com');
    await review.element('reviewInput').fill('Great product!');
    await expect(review.element('reviewInput')).toHaveValue('Great product!');
    await review.element('submitBtn').click();
  });

  await test.step('Expect thank you message', async () => {
    await expect(po.region('main').block('review').element('successMsg')).toBeVisible();
  });
}
