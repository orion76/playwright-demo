import { test, Page, expect } from '@playwright/test';
import { initPage } from '@src/pages/init';
import { deleteAccount } from '@src/api/accounts';
import type { UViewport } from '@src/types';

export interface ScenarioOpts {
  viewport: UViewport;
  role: string;
  lang: string;
}

const dateSuffix = Date.now();

export async function testRegisterUser(page: Page, opts: ScenarioOpts) {
  const home = initPage(page, '/', opts.viewport);
  await home.navigate();

  await test.step('Expect signupLogin visible', async () => {
    const nav = home.region('header').block('nav');
    await expect(nav.element('signupLogin')).toBeVisible();
  });

  await test.step('Click signupLogin', async () => {
    const nav = home.region('header').block('nav');
    await nav.element('signupLogin').click();
    await page.waitForURL('**/login');
  });

  const loginPage = initPage(page, 'login', opts.viewport);
  await test.step('Expect New User Signup title visible', async () => {
    const signup = loginPage.region('main').block('signupForm');
    await expect(signup.element('title')).toBeVisible();
  });

  const userName = 'PW_User_' + dateSuffix;
  const userEmail = `pw_${dateSuffix}@test.com`;

  await test.step('Fill signup form', async () => {
    const signup = loginPage.region('main').block('signupForm');
    await signup.element('nameInput').fill(userName);
    await expect(signup.element('nameInput')).toHaveValue(userName);
    await signup.element('emailInput').fill(userEmail);
    await expect(signup.element('emailInput')).toHaveValue(userEmail);
    await signup.element('signupBtn').click();
    await page.waitForURL('**/signup');
  });

  const signupPage = initPage(page, 'signup', opts.viewport);
  await test.step('Expect Enter Account Information visible', async () => {
    const info = signupPage.region('main').block('accountInfo');
    await expect(info.element('title')).toBeVisible();
  });

  await test.step('Fill account info', async () => {
    const info = signupPage.region('main').block('accountInfo');
    await info.element('titleMr').check();
    await expect(info.element('titleMr')).toBeChecked();
    await info.element('passwordInput').fill('TestPass123!');
    await expect(info.element('passwordInput')).toHaveValue('TestPass123!');
    await info.element('daySelect').selectOption('1');
    await info.element('monthSelect').selectOption('January');
    await info.element('yearSelect').selectOption('1990');
  });

  await test.step('Check newsletter and offers', async () => {
    const info = signupPage.region('main').block('accountInfo');
    await info.element('newsletterCheckbox').check();
    await expect(info.element('newsletterCheckbox')).toBeChecked();
    await info.element('offersCheckbox').check();
    await expect(info.element('offersCheckbox')).toBeChecked();
  });

  await test.step('Fill address', async () => {
    const addr = signupPage.region('main').block('addressInfo');
    await addr.element('firstNameInput').fill('TestFirst');
    await expect(addr.element('firstNameInput')).toHaveValue('TestFirst');
    await addr.element('lastNameInput').fill('TestLast');
    await expect(addr.element('lastNameInput')).toHaveValue('TestLast');
    await addr.element('addressInput').fill('123 Test Street');
    await expect(addr.element('addressInput')).toHaveValue('123 Test Street');
    await addr.element('countrySelect').selectOption('United States');
    await addr.element('stateInput').fill('California');
    await expect(addr.element('stateInput')).toHaveValue('California');
    await addr.element('cityInput').fill('Los Angeles');
    await expect(addr.element('cityInput')).toHaveValue('Los Angeles');
    await addr.element('zipcodeInput').fill('90001');
    await expect(addr.element('zipcodeInput')).toHaveValue('90001');
    await addr.element('mobileInput').fill('1234567890');
    await expect(addr.element('mobileInput')).toHaveValue('1234567890');
  });

  await test.step('Submit account creation', async () => {
    const addr = signupPage.region('main').block('addressInfo');
    await addr.element('createAccountBtn').click();
    await page.waitForURL('**/account_created');
  });

  const created = initPage(page, 'account_created', opts.viewport);
  await test.step('Expect Account Created title visible', async () => {
    const success = created.region('main').block('success');
    await expect(success.element('title')).toBeVisible();
  });

  await test.step('Click Continue', async () => {
    const success = created.region('main').block('success');
    await success.element('continueBtn').click();
    await page.waitForURL('**/');
  });

  await test.step('Expect logged in as username', async () => {
    const nav = home.region('header').block('nav');
    await expect(nav.element('loggedInAs')).toBeVisible();
    await expect(nav.element('loggedInAs')).toContainText(userName);
  });

  await test.step('Delete account via API', async () => {
    const d = await deleteAccount(userEmail, 'TestPass123!');
    expect(d.responseCode).toBe(200);
  });
}
