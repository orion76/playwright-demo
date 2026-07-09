import { test, Page, expect } from '@playwright/test';
import { initPage } from '@src/pages/init';
import type { UViewport } from '@src/types';

export interface ScenarioOpts {
  viewport: UViewport;
  role: string;
  lang: string;
}

export async function testContactForm(page: Page, opts: ScenarioOpts) {
  const po = initPage(page, 'contact_us', opts.viewport);
  await po.navigate();

  await test.step('Expect Get In Touch title visible', async () => {
    const form = po.region('main').block('contactForm');
    await expect(form.element('title')).toBeVisible();
  });

  await test.step('Fill contact form', async () => {
    const form = po.region('main').block('contactForm');
    await form.element('nameInput').fill('TestUser');
    await expect(form.element('nameInput')).toHaveValue('TestUser');
    await form.element('emailInput').fill('test@example.com');
    await expect(form.element('emailInput')).toHaveValue('test@example.com');
    await form.element('subjectInput').fill('Test Subject');
    await expect(form.element('subjectInput')).toHaveValue('Test Subject');
    await form.element('messageInput').fill('This is a test message for the contact form.');
    await expect(form.element('messageInput')).toHaveValue(
      'This is a test message for the contact form.',
    );
  });

  await test.step('Upload file', async () => {
    const form = po.region('main').block('contactForm');
    await form.element('fileInput').setInputFiles({
      name: 'test.txt',
      mimeType: 'text/plain',
      buffer: Buffer.from('test'),
    });
  });

  await test.step('Submit form and accept dialog', async () => {
    const form = po.region('main').block('contactForm');
    page.once('dialog', (d) => {
      expect(d.message()).toContain('OK');
      d.accept();
    });
    await form.element('submitBtn').click();
  });

  await test.step('Expect success message visible', async () => {
    const form = po.region('main').block('contactForm');
    await expect(form.element('successMsg')).toBeVisible();
  });

  await test.step('Click Home and verify', async () => {
    const form = po.region('main').block('contactForm');
    await form.element('homeLink').first().click();
    await page.waitForURL('**/');
  });
}
