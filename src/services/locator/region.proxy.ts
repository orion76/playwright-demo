import { Page } from '@playwright/test';
import { ITranslationService } from '../translation/translation.service';
import { ILocatorBlockProxy, LocatorBlockProxy } from './block.proxy';
import { type UElementLocatorDef } from '../../types';

export interface ILocatorRegionProxy<TRegion extends Record<string, Record<string, UElementLocatorDef>>> {
  block<B extends keyof TRegion>(name: B): ILocatorBlockProxy<TRegion[B]>;
}

export class LocatorRegionProxy<TRegion extends Record<string, Record<string, UElementLocatorDef>>>
  implements ILocatorRegionProxy<TRegion>
{
  constructor(
    private region: TRegion,
    private regionName: string,
    private page: Page,
    private translationService: ITranslationService,
  ) {}

  block<B extends keyof TRegion>(name: B): ILocatorBlockProxy<TRegion[B]> {
    const blockTranslation = this.translationService.region(this.regionName).block(String(name));
    return new LocatorBlockProxy(this.region[name], blockTranslation, this.page);
  }
}
