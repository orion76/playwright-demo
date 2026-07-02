const { defineConfig } = require('@playwright/test');
const { existsSync } = require('fs');
const { join } = require('path');

const localExe = '/home/pasha/.cache/ms-playwright/chromium-1223/chrome-linux64/chrome';
const launchOptions = existsSync(localExe) ? { executablePath: localExe } : {};

module.exports = defineConfig({
  testDir: './tests',
  timeout: 60000,
  expect: { timeout: 10000 },
  globalSetup: './src/setup/global-setup.ts',
  retries: 2,
  workers: 2,
  reporter: [
    ['list'],
    ['html', { outputFolder: 'playwright-report', open: 'never' }],
    ['allure-playwright', { outputFolder: 'allure-results' }],
  ],
  use: {
    headless: true,
    viewport: { width: 1440, height: 900 },
    video: 'on',
    launchOptions,
  },
});
