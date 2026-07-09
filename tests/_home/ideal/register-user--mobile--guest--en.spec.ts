import { test, VIEWPORTS } from '@src/fixtures/test';
import { testRegisterUser } from './shared/register-user';

test.use({ viewport: VIEWPORTS.mobile });
test('SPEC: test', async ({ page }) => {
  await testRegisterUser(page, { viewport: 'mobile', role: 'guest', lang: 'en' });
});
