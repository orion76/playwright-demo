import { test, VIEWPORTS } from '@src/fixtures/test';
import { testSubscriptionInCart } from './shared/subscription-in-cart';

test.use({ viewport: VIEWPORTS.tablet });
test('SPEC: test', async ({ page }) => {
  await testSubscriptionInCart(page, { viewport: 'tablet', role: 'guest', lang: 'en' });
});
