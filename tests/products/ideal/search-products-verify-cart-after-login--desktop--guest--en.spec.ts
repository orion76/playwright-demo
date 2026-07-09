import { test, VIEWPORTS } from '@src/fixtures/test';
import { testSearchProductsVerifyCartAfterLogin } from './shared/search-products-verify-cart-after-login';

test.use({ viewport: VIEWPORTS.desktop });
test('SPEC: products — Search Products and Verify Cart After Login', async ({ page }) => {
  test
    .info()
    .annotations.push(
      { type: 'feature', description: 'Products' },
      { type: 'story', description: 'Search products and verify cart persistence after login' },
      { type: 'severity', description: 'normal' },
    );
  await testSearchProductsVerifyCartAfterLogin(page, {
    viewport: 'desktop',
    role: 'guest',
    lang: 'en',
  });
});
