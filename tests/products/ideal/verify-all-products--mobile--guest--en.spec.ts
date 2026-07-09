import { test, VIEWPORTS } from '@src/fixtures/test';
import { testVerifyAllProducts } from './shared/verify-all-products';

test.use({ viewport: VIEWPORTS.mobile });
test('SPEC: test', async ({ page }) => {
  await testVerifyAllProducts(page, { viewport: 'mobile', role: 'guest', lang: 'en' });
});
