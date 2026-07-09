import { test, Page, expect } from '@playwright/test';
import { initPage } from '@src/pages/init';
import { getEmail, getPassword } from '@src/auth';
import type { UViewport } from '@src/types';

export interface ScenarioOpts {
  viewport: UViewport;
  role: string;
  lang: string;
}

export async function testPlaceOrderLoginBeforeCheckout(page: Page, opts: ScenarioOpts) {
  const po = initPage(page, 'login', opts.viewport);
  await po.navigate();

  await test.step('Expect Login to your account title visible', async () => {
    const form = po.region('main').block('loginForm');
    await expect(form.element('title')).toBeVisible();
  });

  await test.step('Fill login form', async () => {
    const form = po.region('main').block('loginForm');
    await form.element('emailInput').fill(getEmail('persistent'));
    await expect(form.element('emailInput')).toHaveValue(getEmail('persistent'));
    await form.element('passwordInput').fill(getPassword('persistent'));
    await expect(form.element('passwordInput')).toHaveValue(getPassword('persistent'));
    await form.element('loginBtn').click();
    await page.waitForURL('**/');
  });
}
