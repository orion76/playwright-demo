import { test, VIEWPORTS } from '@src/fixtures/test';
import { testPlaceOrderRegisterBeforeCheckout } from './shared/place-order-register-before-checkout';

test.use({ viewport: VIEWPORTS.desktop });
test('SPEC: login — Place Order: Register before Checkout', async ({ page }) => {
  test
    .info()
    .annotations.push(
      { type: 'feature', description: 'Checkout' },
      { type: 'story', description: 'Register before placing order' },
      { type: 'severity', description: 'normal' },
    );
  await testPlaceOrderRegisterBeforeCheckout(page, {
    viewport: 'desktop',
    role: 'guest',
    lang: 'en',
  });
});
