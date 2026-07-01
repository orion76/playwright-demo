import { Page } from '@playwright/test';
import fs from 'fs';
import yaml from 'js-yaml';
import path from 'path';
import { getProjectRoot } from '@src/utils';

interface IBugFixMock {
  url: string;
  file?: string;
  contentType?: string;
  modifyResponse?: Record<string, unknown>;
}

interface IBugFix {
  route: string;
  title: string;
  fix_type: string;
  mock?: IBugFixMock | IBugFixMock[];
}

export async function applyFixes(page: Page) {
  const fixesPath = path.join(getProjectRoot(), 'issues', 'fixed.yml');
  const fixes = yaml.load(fs.readFileSync(fixesPath, 'utf8')) as IBugFix[];

  for (const fix of fixes) {
    if (fix.fix_type !== 'patch' || !fix.mock) continue;

    const mocks = Array.isArray(fix.mock) ? fix.mock : [fix.mock];

    for (const mock of mocks) {
      if (mock.modifyResponse) {
        await page.route(mock.url, async (route) => {
          const response = await route.fetch();
          const body = await response.json();
          Object.assign(body, mock.modifyResponse);
          await route.fulfill({ response, body: JSON.stringify(body) });
        });
      } else if (mock.file) {
        const content = fs.readFileSync(path.resolve(mock.file), 'utf8');
        await page.route(mock.url, async (route) => {
          await route.fulfill({
            body: content,
            contentType: mock.contentType || 'application/javascript',
          });
        });
      }
    }
  }
}
