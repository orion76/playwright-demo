import { test, VIEWPORTS } from '@src/fixtures/test';
import { testTestCasesNavigation } from './shared/test-cases-navigation';

test.use({ viewport: VIEWPORTS.tablet });
test('SPEC: test', async ({ page }) => {
  await testTestCasesNavigation(page, { viewport: 'tablet', role: 'guest', lang: 'en' });
});
