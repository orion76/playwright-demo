import { test, VIEWPORTS } from '@src/fixtures/test';
import { testViewCategoryProducts } from './shared/view-category-products';

test.use({ viewport: VIEWPORTS.desktop });
test('SPEC: / — View Category Products', async ({ page }) => {
  test
    .info()
    .annotations.push(
      { type: 'feature', description: 'Home' },
      { type: 'story', description: 'View products by category' },
      { type: 'severity', description: 'normal' },
    );
  await testViewCategoryProducts(page, { viewport: 'desktop', role: 'guest', lang: 'en' });
});
