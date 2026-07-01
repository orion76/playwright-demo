const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',
  timeout: 60000,
  expect: { timeout: 10000 },
  workers: 2,
  reporter: [
    ['list'],
    ['html', { outputFolder: 'playwright-report', open: 'never' }],
    ['allure-playwright', { outputFolder: 'allure-results' }],
  ],
  use: {
    headless: true,
    viewport: { width: 1920, height: 1080 },
    video: 'on',
    launchOptions: {
      executablePath: '/home/pasha/.cache/ms-playwright/chromium-1223/chrome-linux64/chrome',
    },
  },
  projects: [
    {
      name: 'desktop',
      use: { viewport: { width: 1920, height: 1080 } },
    },
    {
      name: 'mobile',
      use: { viewport: { width: 375, height: 812 } },
    },
    {
      name: 'spec',
      use: { viewport: { width: 1920, height: 1080 } },
    },
  ],
});
