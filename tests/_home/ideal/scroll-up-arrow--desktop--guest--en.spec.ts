import { test, VIEWPORTS } from '@src/fixtures/test';
import { testScrollUpArrow } from './shared/scroll-up-arrow';

test.use({ viewport: VIEWPORTS.desktop });
test('SPEC: / — Scroll Up using Arrow', async ({ page }) => {
  test
    .info()
    .annotations.push(
      { type: 'feature', description: 'Home' },
      { type: 'story', description: 'Scroll up using arrow button' },
      { type: 'severity', description: 'low' },
    );
  await testScrollUpArrow(page, { viewport: 'desktop', role: 'guest', lang: 'en' });
});
