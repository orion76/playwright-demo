import { test, VIEWPORTS } from '@src/fixtures/test';
import { testTestCasesNavigation } from './shared/test-cases-navigation';

test.use({ viewport: VIEWPORTS.desktop });
test.use({ storageState: 'auth/persistent-user.json' });

test('SPEC: test', async ({ page }) => {
  await testTestCasesNavigation(page, { viewport: 'desktop', role: 'registered', lang: 'en' });
});
