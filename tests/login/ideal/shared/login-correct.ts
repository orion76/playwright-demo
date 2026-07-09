import { Page, expect } from '@playwright/test';
import { initPage } from '@src/pages/init';
import { getEmail, getPassword } from '@src/auth';
import type { UViewport } from '@src/types';

export interface ScenarioOpts {
  viewport: UViewport;
  role: string;
  lang: string;
}

export async function testLoginCorrect(page: Page, opts: ScenarioOpts) {
  const po = initPage(page, 'login', opts.viewport);
  await po.navigate();
  await expect(po.region('main').block('loginForm').element('title')).toBeVisible();

  const form = po.region('main').block('loginForm');
  await form.element('emailInput').fill(getEmail('persistent'));
  await form.element('passwordInput').fill(getPassword('persistent'));
  await form.element('loginBtn').click();
  await page.waitForURL('**/');

  const home = initPage(page, '/', opts.viewport);
  await expect(home.region('header').block('nav').element('loggedInAs')).toBeVisible();
}
