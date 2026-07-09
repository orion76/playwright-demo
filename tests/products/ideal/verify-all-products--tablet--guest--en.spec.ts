import { test, VIEWPORTS } from '@src/fixtures/test';
import { testVerifyAllProducts } from './shared/verify-all-products';

test.use({ viewport: VIEWPORTS.tablet });
test('SPEC: test', async ({ page }) => {
  await testVerifyAllProducts(page, { viewport: 'tablet', role: 'guest', lang: 'en' });
});
