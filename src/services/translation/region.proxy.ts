import { ILangService } from '../lang.service';
import { IBlockTranslation, BlockTranslation } from './block.proxy';
import { TTranslationsRegion } from './types';

export interface ITranslationRegion {
  block(name: string): IBlockTranslation;
}

export class TranslationRegion implements ITranslationRegion {
  constructor(
    private region: TTranslationsRegion,
    private langService: ILangService,
  ) {}

  block(name: string): IBlockTranslation {
    return new BlockTranslation(this.region[name], this.langService);
  }
}
