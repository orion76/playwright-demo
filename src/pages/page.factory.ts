import { Page } from '@playwright/test';
import { LangService } from '../services/lang.service';
import { LocatorService } from '../services/locator/locator.service';
import { TranslationService } from '../services/translation/translation.service';
import { TTranslationsPage } from '../services/translation/types';
import { UViewport } from '../types';
import { PageObject } from './page.object';

export function createPage(page: Page, defs: any, translationsDef: TTranslationsPage, route: string, viewport: UViewport) {
  const langService = new LangService();
  const translationService = new TranslationService(translationsDef, langService);
  const locatorService = new LocatorService<any>(defs, page, translationService);

  return new PageObject(page, langService, locatorService, route, viewport);
}
