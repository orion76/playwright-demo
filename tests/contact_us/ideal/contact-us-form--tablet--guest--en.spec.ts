import { test, VIEWPORTS } from '@src/fixtures/test';
import { testContactForm } from './shared/contact-us-form';

test.use({ viewport: VIEWPORTS.tablet });
test('SPEC: test', async ({ page }) => {
  await testContactForm(page, { viewport: 'tablet', role: 'guest', lang: 'en' });
});
