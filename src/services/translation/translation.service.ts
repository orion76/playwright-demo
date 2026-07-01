import { ILangService } from '../lang.service';
import { ITranslationRegion, TranslationRegion } from './region.proxy';
import { TTranslationsPage } from './types';

export interface ITranslationService {
  region(name: string): ITranslationRegion;
}

export class TranslationService implements ITranslationService {
  constructor(
    private translations: TTranslationsPage,
    private langService: ILangService,
  ) {}

  region(name: string): ITranslationRegion {
    return new TranslationRegion(this.translations[name], this.langService);
  }
}
