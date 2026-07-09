import { test, VIEWPORTS } from '@src/fixtures/test';
import { testPlaceOrderRegisterWhileCheckout } from './shared/place-order-register-while-checkout';

test.use({ viewport: VIEWPORTS.desktop });
test('SPEC: products — Place Order: Register while Checkout', async ({ page }) => {
  test
    .info()
    .annotations.push(
      { type: 'feature', description: 'Checkout' },
      { type: 'story', description: 'Place order with registration during checkout' },
      { type: 'severity', description: 'normal' },
    );
  await testPlaceOrderRegisterWhileCheckout(page, {
    viewport: 'desktop',
    role: 'guest',
    lang: 'en',
  });
});
