import { test, VIEWPORTS } from '@src/fixtures/test';
import { testAddReview } from './shared/add-review';

test.use({ viewport: VIEWPORTS.tablet });
test('SPEC: test', async ({ page }) => {
  await testAddReview(page, { viewport: 'tablet', role: 'guest', lang: 'en' });
});
