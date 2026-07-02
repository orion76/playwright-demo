import { Page, expect, type Response } from '@playwright/test';
import { SITE_URL, isBackendRequest } from '../config';

import { ILocatorService } from '../services/locator/locator.service';
import { ILocatorRegionProxy } from '../services/locator/region.proxy';
import { IPage } from './types';
import { ILangService } from '../services/lang.service';
import { TPageLocatorDefs, UViewport } from '../types';
import { ULanguage } from '../services/translation/types';

export interface IPageObject<TLocatorDefs extends TPageLocatorDefs> extends IPage {
  readonly route: string;
  readonly page: Page;
  region<R extends keyof TLocatorDefs>(name: R): ILocatorRegionProxy<TLocatorDefs[R]>;
  setLang(lang: ULanguage): void;
  viewport(): UViewport;
  open(url: string): Promise<void>;
  waitForDomReady(): Promise<void>;
  getTitle(): Promise<string>;
  switchLanguage(targetLang: ULanguage): Promise<void>;
  verifyToastMessage(text: string): Promise<void>;
  waitForResponse(route: string, timeout?: number): Promise<Response>;
}

export class PageObject<
  TLocatorDefs extends TPageLocatorDefs,
> implements IPageObject<TLocatorDefs> {
  constructor(
    private _page: Page,
    private _langService: ILangService,
    private _locatorService: ILocatorService<TLocatorDefs>,
    private _route: string,
    private _viewport: UViewport,
  ) {}

  get page(): Page {
    return this._page;
  }

  viewport(): UViewport {
    return this._viewport;
  }

  get route(): string {
    return this._route;
  }

  region<R extends keyof TLocatorDefs>(name: R): ILocatorRegionProxy<TLocatorDefs[R]> {
    return this._locatorService.region(name);
  }

  setLang(lang: ULanguage) {
    this._langService.setLang(lang);
  }

  async open(url: string) {
    await this._page.goto(url, { waitUntil: 'networkidle' });
  }

  async navigate(url?: string) {
    const target = url ?? `${SITE_URL}${this.route === '/' ? '/' : `/${this.route}`}`;
    await this._page.addInitScript(
      (lang) => localStorage.setItem('activeLanguage', lang),
      this._langService.current,
    );
    await this._page.goto(target, { waitUntil: 'load' });
  }

  async waitForDomReady() {
    await this._page.waitForLoadState('load');
  }

  async getTitle() {
    return await this._page.title();
  }

  async switchLanguage(targetLang: ULanguage) {
    if (this._langService.current === targetLang) return;
    await this._page.evaluate((l) => localStorage.setItem('activeLanguage', l), targetLang);
    await this._page.reload({ waitUntil: 'networkidle' });
    this._langService.setLang(targetLang);
  }

  async verifyToastMessage(text: string) {
    await expect(this._page.getByText(text)).toBeVisible();
  }

  async waitForResponse(route: string, timeout = 10000) {
    return this._page.waitForResponse((resp) => isBackendRequest(resp.request(), route), {
      timeout,
    });
  }
}
