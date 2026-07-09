import { test, VIEWPORTS } from '@src/fixtures/test';
import { testLoginExistingEmail } from './shared/login-existing-email';

test.use({ viewport: VIEWPORTS.mobile });
test('SPEC: test', async ({ page }) => {
  await testLoginExistingEmail(page, { viewport: 'mobile', role: 'guest', lang: 'en' });
});
