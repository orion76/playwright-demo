import { test, VIEWPORTS } from '@src/fixtures/test';
import { testRegisterUser } from './shared/register-user';

test.use({ viewport: VIEWPORTS.desktop });
test('SPEC: / — Register User', async ({ page }) => {
  test
    .info()
    .annotations.push(
      { type: 'feature', description: 'User Registration' },
      { type: 'story', description: 'Register new user with valid data' },
      { type: 'severity', description: 'critical' },
    );
  await testRegisterUser(page, { viewport: 'desktop', role: 'guest', lang: 'en' });
});
