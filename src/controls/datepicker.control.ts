import { Page, Locator } from '@playwright/test';
import { IFormControl } from './types';
import { ULanguage, UElementLocatorDef } from '../types';

export interface IDatepickerLocatorDefs {
  yearOption: UElementLocatorDef;
  monthOption: UElementLocatorDef & { role: 'option' };
  dayOption: UElementLocatorDef & { role: 'option' };
  saveBtn: UElementLocatorDef & { role: 'button' };
}

export interface IDatepickerValue {
  year: number;
  month: number;
  day: number;
}

export class DatepickerControl implements IFormControl<IDatepickerLocatorDefs> {
  static readonly LOCATORS: IDatepickerLocatorDefs = {
    yearOption: { by: 'text' },
    monthOption: { by: 'role', role: 'option' },
    dayOption: { by: 'role', role: 'option' },
    saveBtn: { by: 'role', role: 'button' },
  };

  static readonly LOCALES: Record<string, { en: string; he: string }> = {
    saveBtn: { en: 'Save', he: 'שמור' },
  };

  private _lang: ULanguage;

  constructor(
    private page: Page,
    private trigger: Locator,
    lang: ULanguage = 'he',
  ) {
    this._lang = lang;
  }

  getLocators(): IDatepickerLocatorDefs {
    return DatepickerControl.LOCATORS;
  }

  setLang(lang: ULanguage): void {
    this._lang = lang;
  }

  private portal(): Locator {
    return this.page.locator('.react-datepicker__portal');
  }

  private localeText(key: string): string | undefined {
    return DatepickerControl.LOCALES[key]?.[this._lang];
  }

  /** Left arrow button inside datepicker header */
  private prevBtn(): Locator {
    return this.portal().locator('button').first();
  }

  /** Right arrow button inside datepicker header */
  private nextBtn(): Locator {
    return this.portal().locator('button').last();
  }

  /** Navigate years until target year is visible, then click it */
  private async selectYear(year: number): Promise<void> {
    for (let i = 0; i < 20; i++) {
      const option = this.portal()
        .locator('.react-datepicker__year-text')
        .filter({ hasText: String(year) });
      if (await option.isVisible().catch(() => false)) {
        await option.click();
        return;
      }
      await this.prevBtn().click();
      await this.page.waitForTimeout(100);
    }
    throw new Error(`Year ${year} not found in datepicker after 20 scrolls`);
  }

  /** Select month. Tries role=option first, falls back to CSS class grid. */
  private async selectMonth(monthIndex: number): Promise<void> {
    // Try role=option (event create variant)
    const roleOptions = this.portal().locator('[role="option"]');
    const roleCount = await roleOptions.count().catch(() => 0);
    if (roleCount >= monthIndex) {
      const opt = roleOptions.nth(monthIndex - 1);
      if (await opt.isVisible().catch(() => false)) {
        await opt.click();
        return;
      }
    }
    // Fallback: CSS class grid (Personal Info variant)
    const monthText = this.portal()
      .locator('.react-datepicker__month-text')
      .nth(monthIndex - 1);
    await monthText.waitFor({ state: 'visible', timeout: 5000 });
    await monthText.click();
  }

  /** Select day. Tries role=option first, falls back to CSS class grid. */
  private async selectDay(day: number): Promise<void> {
    // Try role=option (event create variant)
    const roleOptions = this.portal().locator('[role="option"]');
    const roleCount = await roleOptions.count().catch(() => 0);
    if (roleCount > 0) {
      const opt = roleOptions.filter({ hasText: String(day) }).first();
      if (await opt.isVisible().catch(() => false)) {
        await opt.click();
        return;
      }
    }
    // Fallback: CSS class grid (Personal Info variant)
    const dayEl = this.portal()
      .locator('.react-datepicker__day')
      .filter({ hasText: String(day) })
      .first();
    await dayEl.waitFor({ state: 'visible', timeout: 5000 });
    await dayEl.click();
  }

  async setValue({ year, month, day }: IDatepickerValue): Promise<void> {
    await this.page.keyboard.press('Escape');
    await this.trigger.click();
    await this.portal().waitFor({ state: 'visible', timeout: 5000 });

    await this.selectYear(year);
    await this.page.waitForTimeout(300);
    await this.selectMonth(month);
    await this.page.waitForTimeout(300);
    await this.selectDay(day);

    // Handle optional Save button (event create variant)
    if (
      await this.saveBtn()
        .isVisible({ timeout: 3000 })
        .catch(() => false)
    ) {
      await this.saveBtn().click();
    }

    await this.page.keyboard.press('Escape');
  }

  yearOption(year: string): Locator {
    return this.portal().getByText(year, { exact: true });
  }

  monthOption(monthIndex: number): Locator {
    return this.portal()
      .locator('[role="option"]')
      .nth(monthIndex - 1);
  }

  dayOption(day: string): Locator {
    return this.portal().locator('[role="option"]').filter({ hasText: day });
  }

  saveBtn(): Locator {
    return this.page
      .locator('.datepicker-modal')
      .locator('button')
      .filter({
        hasText: this.localeText('saveBtn'),
      });
  }

  async getValue(): Promise<string | null> {
    return await this.trigger.textContent();
  }
}
