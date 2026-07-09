import { Page, expect } from '@playwright/test';
import { initPage } from '@src/pages/init';
import { getEmail } from '@src/auth';
import type { UViewport } from '@src/types';

export interface ScenarioOpts {
  viewport: UViewport;
  role: string;
  lang: string;
}

export async function testLoginExistingEmail(page: Page, opts: ScenarioOpts) {
  const po = initPage(page, 'login', opts.viewport);
  await po.navigate();
  await expect(po.region('main').block('signupForm').element('title')).toBeVisible();

  const form = po.region('main').block('signupForm');
  await form.element('nameInput').fill('ExistingUser');
  await form.element('emailInput').fill(getEmail('persistent'));
  await form.element('signupBtn').click();

  await expect(po.region('main').block('signupForm').element('errorMsg')).toBeVisible();
}
