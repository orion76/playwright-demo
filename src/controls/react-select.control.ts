import { Page, Locator } from "@playwright/test";
import { IFormControl } from "./types";
import { ULanguage } from "../types";

interface IReactSelectLocatorDefs {
  option: { by: "role"; role: "option" };
}

export class ReactSelectControl implements IFormControl<IReactSelectLocatorDefs> {
  static readonly LOCATORS: IReactSelectLocatorDefs = {
    option: { by: "role", role: "option" },
  };

  private _lang: ULanguage;

  constructor(
    private page: Page,
    private trigger: Locator,
    lang: ULanguage = "he",
  ) {
    this._lang = lang;
  }

  getLocators(): IReactSelectLocatorDefs {
    return ReactSelectControl.LOCATORS;
  }

  setLang(lang: ULanguage): void {
    this._lang = lang;
  }

  async selectOption(optionText: string): Promise<void> {
    await this.trigger.click();
    await this.page.waitForTimeout(300);
    await this.page.getByRole("option", { name: optionText, exact: true }).click();
  }

  async setValue(text: string): Promise<void> {
    // Searchable React-Select: click, type text, press ArrowDown + Enter
    await this.trigger.click();
    await this.page.waitForTimeout(300);
    const input = this.trigger.locator("input").first();
    if (await input.isVisible().catch(() => false)) {
      await input.fill(text);
      await this.page.waitForTimeout(1000);
      await this.page.keyboard.press("ArrowDown");
      await this.page.keyboard.press("Enter");
    } else {
      // Non-searchable (e.g. gender): just click the option
      await this.page.getByRole("option", { name: text, exact: true }).click();
    }
  }

  async getValue(): Promise<string | null> {
    const input = this.trigger.locator("input").first();
    if (await input.isVisible().catch(() => false)) {
      return await input.inputValue();
    }
    return await this.trigger.textContent();
  }
}
