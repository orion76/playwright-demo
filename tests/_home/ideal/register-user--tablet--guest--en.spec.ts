import { test, VIEWPORTS } from '@src/fixtures/test';
import { testRegisterUser } from './shared/register-user';

test.use({ viewport: VIEWPORTS.tablet });
test('SPEC: test', async ({ page }) => {
  await testRegisterUser(page, { viewport: 'tablet', role: 'guest', lang: 'en' });
});
