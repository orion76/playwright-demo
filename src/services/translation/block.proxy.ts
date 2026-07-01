import { ILangService } from '../lang.service';
import { TTranslationsBlock } from './types';

export interface IBlockTranslation {
  element(id: string): string;
}

export class BlockTranslation implements IBlockTranslation {
  constructor(
    private block: TTranslationsBlock,
    private langService: ILangService,
  ) {}

  element(id: string): string {
    return this.block[id]?.[this.langService.current] ?? id;
  }
}
