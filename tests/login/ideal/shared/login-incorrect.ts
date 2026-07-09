import { Page, expect } from '@playwright/test';
import { initPage } from '@src/pages/init';
import type { UViewport } from '@src/types';

export interface ScenarioOpts {
  viewport: UViewport;
  role: string;
  lang: string;
}

export async function testLoginIncorrect(page: Page, opts: ScenarioOpts) {
  const po = initPage(page, 'login', opts.viewport);
  await po.navigate();
  await expect(po.region('main').block('loginForm').element('title')).toBeVisible();

  const form = po.region('main').block('loginForm');
  await form.element('emailInput').fill('wrong@email.com');
  await form.element('passwordInput').fill('wrongpass123');
  await form.element('loginBtn').click();

  await expect(po.region('main').block('loginForm').element('errorMsg')).toBeVisible();
}
