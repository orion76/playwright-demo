import { test, Page, expect } from '@playwright/test';
import { initPage } from '@src/pages/init';
import type { UViewport } from '@src/types';

export interface ScenarioOpts {
  viewport: UViewport;
  role: string;
  lang: string;
}

const dateSuffix = Date.now();

export async function testPlaceOrderRegisterBeforeCheckout(page: Page, opts: ScenarioOpts) {
  const po = initPage(page, 'login', opts.viewport);
  await po.navigate();

  await test.step('Expect New User Signup title visible', async () => {
    const signup = po.region('main').block('signupForm');
    await expect(signup.element('title')).toBeVisible();
  });

  await test.step('Fill signup form', async () => {
    const signup = po.region('main').block('signupForm');
    const userName = 'PW_User_' + dateSuffix;
    const userEmail = 'pw_' + dateSuffix + '@test.com';
    await signup.element('nameInput').fill(userName);
    await expect(signup.element('nameInput')).toHaveValue(userName);
    await signup.element('emailInput').fill(userEmail);
    await expect(signup.element('emailInput')).toHaveValue(userEmail);
    await signup.element('signupBtn').click();
    await page.waitForURL('**/signup');
  });
}
