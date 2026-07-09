import { test, VIEWPORTS } from '@src/fixtures/test';
import { testRemoveProduct } from './shared/remove-product';

test.use({ viewport: VIEWPORTS.tablet });

test('SPEC: view_cart — Remove Product', async ({ page }) => {
  test
    .info()
    .annotations.push(
      { type: 'feature', description: 'Cart Management' },
      { type: 'story', description: 'Remove product from cart' },
      { type: 'severity', description: 'normal' },
    );
  await testRemoveProduct(page, { viewport: 'tablet', role: 'guest', lang: 'en' });
});
