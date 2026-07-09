import { test, VIEWPORTS } from '@src/fixtures/test';
import { testSubscription } from './shared/subscription';

test.use({ viewport: VIEWPORTS.mobile });
test('SPEC: test', async ({ page }) => {
  await testSubscription(page, { viewport: 'mobile', role: 'guest', lang: 'en' });
});
