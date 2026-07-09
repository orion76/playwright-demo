import { test, expect } from '@playwright/test';

test.use({ serviceWorkers: 'block' });

test('DEMO: locator not found', async ({ page }) => {
  test
    .info()
    .annotations.push(
      { type: 'feature', description: 'Error Demo' },
      { type: 'story', description: 'Demonstrate locator timeout failure' },
      { type: 'severity', description: 'critical' },
    );
  await page.goto('https://automationexercise.com');
  await expect(page.getByRole('heading', { name: 'This Text Does Not Exist On Page' })).toBeVisible(
    {
      timeout: 5000,
    },
  );
});

test('DEMO: assert value mismatch', async ({ page }) => {
  test
    .info()
    .annotations.push(
      { type: 'feature', description: 'Error Demo' },
      { type: 'story', description: 'Demonstrate assertion failure' },
      { type: 'severity', description: 'normal' },
    );
  await page.goto('https://automationexercise.com');
  const title = await page.title();
  expect(title).toBe('Wrong Title That Will Never Match');
});

test('DEMO: strict mode violation', async ({ page }) => {
  test
    .info()
    .annotations.push(
      { type: 'feature', description: 'Error Demo' },
      { type: 'story', description: 'Demonstrate strict mode violation' },
      { type: 'severity', description: 'minor' },
    );
  await page.goto('https://automationexercise.com');
  await page.getByText('Full-Fledged practice website for Automation Engineers').click();
});
