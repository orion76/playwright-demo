import { test, VIEWPORTS } from '@src/fixtures/test';
import { testVerifyProductDetail } from './shared/verify-product-detail';

test.use({ viewport: VIEWPORTS.tablet });
test('SPEC: test', async ({ page }) => {
  await testVerifyProductDetail(page, { viewport: 'tablet', role: 'guest', lang: 'en' });
});
