import { Page, Locator } from '@playwright/test';
import { IBlockTranslation } from '../translation/block.proxy';
import { type UElementLocatorDef } from '../../types';

export interface ILocatorBlockProxy<TBlock extends Record<string, UElementLocatorDef>> {
  element<K extends keyof TBlock>(name: K): Locator;
}

export class LocatorBlockProxy<TBlock extends Record<string, UElementLocatorDef>>
  implements ILocatorBlockProxy<TBlock>
{
  constructor(
    private block: TBlock,
    private blockTranslation: IBlockTranslation,
    private page: Page,
  ) {}

  element<K extends keyof TBlock>(name: K): Locator {
    const def = this.block[name];
    const text = this.blockTranslation.element(String(name));

    switch (def.by) {
      case 'role':
        return this.page.getByRole(def.role as any, { name: text });
      case 'text':
        return this.page.getByText(text);
      case 'label':
        return this.page.getByLabel(text);
      case 'placeholder':
        return this.page.getByPlaceholder(text, { exact: true });
      case 'css':
        return this.page.locator(def.selector ?? text);
    }
  }
}
