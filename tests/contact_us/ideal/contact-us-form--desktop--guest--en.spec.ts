import { test, VIEWPORTS } from '@src/fixtures/test';
import { testContactForm } from './shared/contact-us-form';

test.use({ viewport: VIEWPORTS.desktop });
test('SPEC: contact_us — Contact Us Form', async ({ page }) => {
  test
    .info()
    .annotations.push(
      { type: 'feature', description: 'Contact Us' },
      { type: 'story', description: 'Submit contact form with valid data' },
      { type: 'severity', description: 'normal' },
    );
  await testContactForm(page, { viewport: 'desktop', role: 'guest', lang: 'en' });
});
