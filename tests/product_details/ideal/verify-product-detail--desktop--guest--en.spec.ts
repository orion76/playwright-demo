import { test, VIEWPORTS } from '@src/fixtures/test';
import { testVerifyProductDetail } from './shared/verify-product-detail';

test.use({ viewport: VIEWPORTS.desktop });
test('SPEC: product_details — Verify Product Detail', async ({ page }) => {
  test
    .info()
    .annotations.push(
      { type: 'feature', description: 'Product Details' },
      { type: 'story', description: 'Verify product information' },
      { type: 'severity', description: 'normal' },
    );
  await testVerifyProductDetail(page, { viewport: 'desktop', role: 'guest', lang: 'en' });
});
