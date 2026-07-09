import { test, VIEWPORTS } from '@src/fixtures/test';
import { testLoginExistingEmail } from './shared/login-existing-email';

test.use({ viewport: VIEWPORTS.desktop });
test('SPEC: login — Register with existing email', async ({ page }) => {
  test
    .info()
    .annotations.push(
      { type: 'feature', description: 'User Registration' },
      { type: 'story', description: 'Register with an already registered email' },
      { type: 'severity', description: 'normal' },
    );
  await testLoginExistingEmail(page, { viewport: 'desktop', role: 'guest', lang: 'en' });
});
