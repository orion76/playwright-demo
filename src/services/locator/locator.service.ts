import { Page } from '@playwright/test';
import { TPageLocatorDefs } from '../../types';
import { ITranslationService } from '../translation/translation.service';
import { ILocatorRegionProxy, LocatorRegionProxy } from './region.proxy';

export interface ILocatorService<PageDefs extends TPageLocatorDefs> {
  region<R extends keyof PageDefs>(name: R): ILocatorRegionProxy<PageDefs[R]>;
}

export class LocatorService<PageDefs extends TPageLocatorDefs> implements ILocatorService<PageDefs> {
  constructor(
    private defs: PageDefs,
    private page: Page,
    private translationService: ITranslationService,
  ) {}

  region<R extends keyof PageDefs>(name: R): ILocatorRegionProxy<PageDefs[R]> {
    return new LocatorRegionProxy(
      this.defs[name],
      String(name),
      this.page,
      this.translationService,
    );
  }
}
