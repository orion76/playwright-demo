import { test, Page, expect } from '@playwright/test';
import { initPage } from '@src/pages/init';
import type { UViewport } from '@src/types';

export interface ScenarioOpts {
  viewport: UViewport;
  role: string;
  lang: string;
}

export async function testSubscription(page: Page, opts: ScenarioOpts) {
  const po = initPage(page, '/', opts.viewport);
  await po.navigate();

  await test.step('Expect subscription title visible', async () => {
    const sub = po.region('footer').block('subscription');
    await expect(sub.element('title')).toBeVisible();
  });

  await test.step('Fill email and subscribe', async () => {
    const sub = po.region('footer').block('subscription');
    await sub.element('emailInput').fill('subscribe@test.com');
    await expect(sub.element('emailInput')).toHaveValue('subscribe@test.com');
    await sub.element('subscribeBtn').click();
  });

  await test.step('Expect success message', async () => {
    const sub = po.region('footer').block('subscription');
    await expect(sub.element('successMsg')).toBeVisible();
  });
}
