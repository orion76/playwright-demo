import { test, VIEWPORTS } from '@src/fixtures/test';
import { testSearchProduct } from './shared/search-product';

test.use({ viewport: VIEWPORTS.tablet });
test('SPEC: test', async ({ page }) => {
  await testSearchProduct(page, { viewport: 'tablet', role: 'guest', lang: 'en' });
});
