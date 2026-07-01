import { Page } from '@playwright/test';
import { ILangService } from '../services/lang.service';
import { ILocatorService } from '../services/locator/locator.service';

export interface IPage {
  open(url: string): Promise<void>;
  navigate(url?: string): Promise<void>;
}

export type PageConstructor = new (
  page: Page,
  langService: ILangService,
  locatorService: ILocatorService<any>,
) => IPage;
