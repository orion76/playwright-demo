import { Page, Locator } from "@playwright/test";
import { IFormControl } from "./types";
import { ULanguage } from "../types";

interface IOtpLocatorDefs {
  digit: { by: "css"; selector: string };
}

export class OtpControl implements IFormControl<IOtpLocatorDefs> {
  static readonly LOCATORS: IOtpLocatorDefs = {
    digit: { by: "css", selector: 'input[type="tel"]' },
  };

  private _lang: ULanguage;
  private _count: number;

  constructor(
    private page: Page,
    lang: ULanguage = "he",
    count = 6,
  ) {
    this._lang = lang;
    this._count = count;
  }

  getLocators(): IOtpLocatorDefs {
    return OtpControl.LOCATORS;
  }

  setLang(lang: ULanguage): void {
    this._lang = lang;
  }

  private inputs(): Locator {
    return this.page.locator(OtpControl.LOCATORS.digit.selector);
  }

  digit(index: number): Locator {
    return this.inputs().nth(index);
  }

  async setValue(code: string): Promise<void> {
    for (let i = 0; i < Math.min(code.length, this._count); i++) {
      await this.digit(i).evaluate((el: HTMLInputElement, val: string) => {
        const s = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value')?.set;
        if (s) {
          s.call(el, val);
          el.dispatchEvent(new Event('input', { bubbles: true }));
        } else {
          el.value = val;
        }
      }, code[i]);
    }
  }

  async getValue(): Promise<string> {
    const digits: string[] = [];
    for (let i = 0; i < this._count; i++) {
      digits.push(await this.digit(i).inputValue());
    }
    return digits.join("");
  }

  async clear(): Promise<void> {
    for (let i = 0; i < this._count; i++) {
      await this.digit(i).evaluate((el: HTMLInputElement) => {
        const s = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value')?.set;
        if (s) {
          s.call(el, '');
          el.dispatchEvent(new Event('input', { bubbles: true }));
        } else {
          el.value = '';
        }
      });
    }
  }
}
