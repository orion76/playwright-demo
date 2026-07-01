import { Page, Locator } from '@playwright/test';
import path from 'path';
import { IFormControl } from './types';
import { ULanguage } from '../types';

interface IFileUploadLocatorDefs {
  trigger: { by: 'text' };
  fileInput: { by: 'css'; selector: 'input[type="file"]' };
}

export class FileUploadControl implements IFormControl<IFileUploadLocatorDefs> {
  static readonly LOCATORS: IFileUploadLocatorDefs = {
    trigger: { by: 'text' },
    fileInput: { by: 'css', selector: 'input[type="file"]' },
  };

  private _lang: ULanguage;

  constructor(
    private page: Page,
    private trigger: Locator,
    lang: ULanguage = 'he',
  ) {
    this._lang = lang;
  }

  getLocators(): IFileUploadLocatorDefs {
    return FileUploadControl.LOCATORS;
  }

  setLang(lang: ULanguage): void {
    this._lang = lang;
  }

  fileInput(): Locator {
    return this.page.locator('input[type="file"]');
  }

  async setValue(filePath: string): Promise<void> {
    const resolved = path.resolve(filePath);
    const fileChooserPromise = this.page.waitForEvent('filechooser');
    await this.trigger.click();
    const fileChooser = await fileChooserPromise;
    await fileChooser.setFiles(resolved);
  }

  async getValue(): Promise<string | null> {
    return await this.fileInput().inputValue();
  }
}
