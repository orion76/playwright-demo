import { test, Page, expect } from '@playwright/test';
import { initPage } from '@src/pages/init';
import type { UViewport } from '@src/types';

export interface ScenarioOpts {
  viewport: UViewport;
  role: string;
  lang: string;
}

export async function testScrollUpWithoutArrow(page: Page, opts: ScenarioOpts) {
  const po = initPage(page, '/', opts.viewport);
  await po.navigate();

  await test.step('Scroll down to footer', async () => {
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    const sub = po.region('footer').block('subscription');
    await expect(sub.element('title')).toBeVisible();
  });

  await test.step('Scroll up to top', async () => {
    await page.evaluate(() => window.scrollTo(0, 0));
  });

  await test.step('Expect hero text visible after scroll up', async () => {
    const hero = po.region('main').block('hero');
    await expect(hero.element('title')).toBeVisible();
  });
}
