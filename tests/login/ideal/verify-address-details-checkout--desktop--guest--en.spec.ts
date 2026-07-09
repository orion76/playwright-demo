import { test, VIEWPORTS } from '@src/fixtures/test';
import { testVerifyAddressDetailsCheckout } from './shared/verify-address-details-checkout';

test.use({ viewport: VIEWPORTS.desktop });
test('SPEC: login — Verify Address Details in Checkout', async ({ page }) => {
  test
    .info()
    .annotations.push(
      { type: 'feature', description: 'Checkout' },
      { type: 'story', description: 'Verify address details during checkout' },
      { type: 'severity', description: 'normal' },
    );
  await testVerifyAddressDetailsCheckout(page, { viewport: 'desktop', role: 'guest', lang: 'en' });
});
