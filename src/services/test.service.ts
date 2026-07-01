import { Page } from "@playwright/test";
import { initPage } from "../pages/init";
import { IPageObject } from "../pages/page.object";
import type { ULanguage, UViewport } from "../types";

export interface ITestService {
  open(route: string): Promise<IPageObject<any>>;
  setLang(lang: ULanguage): void;
  setViewport(viewport: UViewport): void;
}

export class TestService implements ITestService {
  constructor(
    private page: Page,
    private lang: ULanguage,
    private viewport: UViewport,
  ) {}

  async open(route: string): Promise<IPageObject<any>> {
    const instance = initPage(this.page, route, this.viewport) as unknown as IPageObject<any>;
    instance.setLang(this.lang);
    await instance.navigate();
    return instance;
  }

  setLang(lang: ULanguage) {
    this.lang = lang;
  }

  setViewport(viewport: UViewport) {
    this.viewport = viewport;
  }
}
