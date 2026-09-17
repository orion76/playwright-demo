### ИНСТРУКЦИЯ ДЛЯ СОЗДАНИЯ POM С BASEPAGE

`BasePage` уже существует — `src/pages/base.page.ts`. Не создавай его заново.

**BasePage** — generic, параметризован описаниями локаторов страницы:

```ts
abstract class BasePage<TLocatorDefs extends TPageLocatorDefs> {
  protected t: LocatorService<TLocatorDefs>;  // t.region().block().element() → Locator
  abstract readonly relativeUrl: string;
  constructor(page: Page, defs: TLocatorDefs, lang?: ULanguage)
}
```

**Описания локаторов** — `src/locators.ts` → `PAGE_LOCATORS`.

**Переводы** — `src/locators.ts` → `T` (глобальный словарь, ключи `"region.block.element"`).

`t.region().block().element()` возвращает Playwright `Locator`:

```ts
this.t.region("main").block("cta").element("registerButton").click();
```

**Пример POM:**

```ts
import { Page } from "@playwright/test";
import { BasePage } from "./base.page";
import { PAGE_LOCATORS, type ULanguage } from "../locators";

export class HomePage extends BasePage<typeof PAGE_LOCATORS.home> {
  readonly relativeUrl = "/";

  constructor(page: Page, lang?: ULanguage) {
    super(page, PAGE_LOCATORS.home, lang);
  }

  async clickRegister() {
    await this.t.region("main").block("cta").element("registerButton").click();
  }
}
```

**Методы BasePage:**
- `open(url)` — goto c waitUntil: domcontentloaded
- `navigate()` — open(SITE_URL + relativeUrl)
- `switchLanguage(target)` — клик HE/EN + обновляет this.t.lang
- `verifyToastMessage(text)` — expect(text).toBeVisible()
- `waitForResponse(route)` — ждёт бэкенд-запрос
