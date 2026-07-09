import { test, VIEWPORTS } from '@src/fixtures/test';
import { testLoginExistingEmail } from './shared/login-existing-email';

test.use({ viewport: VIEWPORTS.tablet });
test('SPEC: test', async ({ page }) => {
  await testLoginExistingEmail(page, { viewport: 'tablet', role: 'guest', lang: 'en' });
});
