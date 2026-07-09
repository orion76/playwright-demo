import { test, VIEWPORTS } from '@src/fixtures/test';
import { testRecommendedItems } from './shared/recommended-items';

test.use({ viewport: VIEWPORTS.desktop });
test('SPEC: / — Recommended Items', async ({ page }) => {
  test
    .info()
    .annotations.push(
      { type: 'feature', description: 'Home' },
      { type: 'story', description: 'Add recommended items to cart' },
      { type: 'severity', description: 'normal' },
    );
  await testRecommendedItems(page, { viewport: 'desktop', role: 'guest', lang: 'en' });
});
