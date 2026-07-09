import { test, VIEWPORTS } from '@src/fixtures/test';
import { testSearchProduct } from './shared/search-product';

test.use({ viewport: VIEWPORTS.mobile });
test('SPEC: test', async ({ page }) => {
  await testSearchProduct(page, { viewport: 'mobile', role: 'guest', lang: 'en' });
});
