import { Page, Locator, FrameLocator } from '@playwright/test';
import { IFormControl } from './types';
import { ULanguage } from '../types';

interface IRichTextLocatorDefs {
  editor: { by: 'css'; selector: 'body' };
}

export class RichTextControl implements IFormControl<IRichTextLocatorDefs> {
  static readonly LOCATORS: IRichTextLocatorDefs = {
    editor: { by: 'css', selector: 'body' },
  };

  private frame: FrameLocator;
  private _lang: ULanguage;

  constructor(
    private page: Page,
    private iframeSelector: string,
    lang: ULanguage = 'he',
  ) {
    this.frame = page.frameLocator(iframeSelector);
    this._lang = lang;
  }

  getLocators(): IRichTextLocatorDefs {
    return RichTextControl.LOCATORS;
  }

  setLang(lang: ULanguage): void {
    this._lang = lang;
  }

  editor(): Locator {
    return this.frame.locator('body');
  }

  async setValue(text: string): Promise<void> {
    await this.editor().click();
    await this.editor().fill(text);
  }

  async getValue(): Promise<string | null> {
    return await this.editor().textContent();
  }
}
