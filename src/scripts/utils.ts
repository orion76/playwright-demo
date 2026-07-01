export function getUrlPath(url: string) {
  const cleanUrl = url.replace(/^\/+|\/+$/g, "");
  const parts = cleanUrl.split("/");

  return parts[parts.length - 1];
}

export function pathToCamelCase(path: string) {
  return path
    .split(/[-_]/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join("");
}
export function pathToKebabCase(path: string) {
  return path
    .replace(/([a-z])([A-Z])/g, "$1-$2")
    .replace(/[\s_]+/g, "-")
    .toLowerCase();
}

export function createPageClassTemplate(route: string, parentClassPath: string) {
  const urlPath = getUrlPath(route);
  const camelCaseName = pathToCamelCase(urlPath);
  const className = `${camelCaseName}Page`;

  return `import { TestService } from '../../src/services/test.service';
import { PageObject, IPageObject } from '${parentClassPath}';

export interface I${className} extends IPageObject<any> {}

export class ${className} extends PageObject<any> implements I${className} {
  constructor(page: any, langService: any, locatorService: any) {
    super(page, langService, locatorService, '${route}');
  }
}
`;
}

export function createTestTemplate(camelCaseName: string, pagePath: string) {
  const pageClass = `${camelCaseName}Page`;
  return `import { test, expect } from '@playwright/test';
import { TestService } from '../../src/services/test.service';
import { ${pageClass} } from '../../src/pages/${pagePath.replace(".ts", "")}';

test.use({ serviceWorkers: 'block' });

test('${camelCaseName} main scenario', async ({ page }) => {
  const po = await new TestService(page, 'he', 'desktop').open(${pageClass}, '${camelCaseName.toLowerCase()}');

  // TODO: напиши шаги теста
  await expect(po.region('regionName').block('blockName').element('elementName')).toBeVisible();
});
`;
}
