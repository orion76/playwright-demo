import { test, Page, expect } from '@playwright/test';
import { initPage } from '@src/pages/init';
import type { UViewport } from '@src/types';

export interface ScenarioOpts {
  viewport: UViewport;
  role: string;
  lang: string;
}

export async function testTestCasesNavigation(page: Page, opts: ScenarioOpts) {
  const po = initPage(page, '/', opts.viewport);
  await po.navigate();

  await test.step('Expect testCases link visible', async () => {
    const nav = po.region('header').block('nav');
    await expect(nav.element('testCases')).toBeVisible();
  });

  await test.step('Click testCases and verify navigation', async () => {
    const nav = po.region('header').block('nav');
    await nav.element('testCases').click();
    await page.waitForURL('**/test_cases');
  });
}
