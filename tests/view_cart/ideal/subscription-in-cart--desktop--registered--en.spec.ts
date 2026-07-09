import { test, VIEWPORTS } from '@src/fixtures/test';
import { testSubscriptionInCart } from './shared/subscription-in-cart';

test.use({ viewport: VIEWPORTS.desktop });
test.use({ storageState: 'auth/persistent-user.json' });

test('SPEC: test', async ({ page }) => {
  await testSubscriptionInCart(page, { viewport: 'desktop', role: 'registered', lang: 'en' });
});
