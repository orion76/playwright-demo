import { test, VIEWPORTS } from '@src/fixtures/test';
import { testLoginIncorrect } from './shared/login-incorrect';

test.use({ viewport: VIEWPORTS.mobile });
test('SPEC: test', async ({ page }) => {
  await testLoginIncorrect(page, { viewport: 'mobile', role: 'guest', lang: 'en' });
});
