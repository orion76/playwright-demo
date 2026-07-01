import { chromium } from '@playwright/test';
import { join } from 'path';
import { SITE_URL as BASE } from '../src/config';

async function getPageTexts(page: any) {
  const sidebar = await page
    .locator("nav a, [role='navigation'] a, aside a, [class*='sidebar']")
    .allTextContents();
  const headings = await page.locator('h1, h2, h3, h4, h5, h6').allTextContents();
  const buttons = await page.getByRole('button').allTextContents();
  const inputs = await page.locator("input, textarea, [contenteditable='true']").all();
  const placeholders: string[] = [];
  for (const el of await inputs.all()) {
    const ph = await el.getAttribute('placeholder').catch(() => null);
    if (ph) placeholders.push(ph);
    const label = await page
      .locator(`label[for="${await el.getAttribute('id')}"]`)
      .textContent()
      .catch(() => null);
    if (label?.trim()) placeholders.push(label.trim());
  }
  const labels = await page.locator("label, [class*='label'], [class*='title']").allTextContents();
  const links = await page.getByRole('link').allTextContents();
  return [
    ...new Set(
      [...sidebar, ...headings, ...buttons, ...placeholders, ...labels, ...links]
        .map((t) => t.trim())
        .filter(Boolean),
    ),
  ];
}

async function main() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1920, height: 1080 } });
  const page = await context.newPage();

  // Load in HE
  await page.goto(`${BASE}/event/create`, { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);
  const heTexts = await getPageTexts(page);
  console.log('=== HE Texts ===');
  heTexts.forEach((t) => console.log(`  "${t}"`));

  // Switch to EN
  const toggle = page.locator('div.styles_select__NZlUw').first();
  await toggle.click();
  await page.waitForTimeout(300);
  await page.getByText('EN', { exact: true }).first().click();
  await page.waitForTimeout(500);
  const enTexts = await getPageTexts(page);
  console.log('\n=== EN Texts ===');
  enTexts.forEach((t) => console.log(`  "${t}"`));

  await browser.close();
}

main().catch(console.error);
