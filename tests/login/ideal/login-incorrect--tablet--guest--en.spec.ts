import { test, VIEWPORTS } from '@src/fixtures/test';
import { testLoginIncorrect } from './shared/login-incorrect';

test.use({ viewport: VIEWPORTS.tablet });
test('SPEC: test', async ({ page }) => {
  await testLoginIncorrect(page, { viewport: 'tablet', role: 'guest', lang: 'en' });
});
