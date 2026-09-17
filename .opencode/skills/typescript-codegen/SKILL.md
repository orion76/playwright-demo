---
name: typescript-codegen
description: Use when writing or refactoring TypeScript code. Conventions for file structure, types placement, naming, and module organization.
---

# TypeScript Codegen

Правила организации TypeScript-кода в проекте.

## Naming

- **Интерфейсы** — префикс `I`. Пример: `IPageStructure`, `IFormField`
- **Типы** (обычные, не union) — префикс `T`. Пример: `TTranslationPair`, `TPageLocatorDefs`
- **Типы-union** — префикс `U`. Пример: `ULanguage`, `UPageBlock`
- **Enum** — префикс `E`. Пример: `EHttpMethod`

## Классы и интерфейсы

- **Каждый класс** реализует одноимённый интерфейс с префиксом `I`:

  ```ts
  // user.service.ts
  export interface IUserService {
    getProfile(): Promise<UserProfile>;
    updateProfile(data: Partial<UserProfile>): Promise<void>;
  }

  export class UserService implements IUserService { ... }
  ```

- **В коде** используй тип интерфейса, а не класса:

  ```ts
  // ✅ правильно
  private service: IUserService;

  // ❌ неправильно
  private service: UserService;
  ```

- **Конструктор** принимает интерфейсы, а не конкретные классы:

  ```ts
  export class ProfilePage extends BasePage<any> implements IProfilePage {
    constructor(
      page: Page,
      langService: ILangService,
      t: ILocatorService<any>,
    ) { super(page, langService, t); }
  }
  ```

- Исключение: при создании экземпляра через `new`.

- **Файловая структура**: интерфейс может храниться:
  - В том же файле, если он малый и используется только этим классом
  - В `types.ts` корня модуля, если используется извне

## Types

- Типы, интерфейсы, `type` и `enum` храни в отдельном файле `types.ts` в корне папки-модуля.
- Если типов много — создавай подпапку `types/` внутри модуля, файлы складывай туда.
- Примеры:
  ```
  src/services/locator/types.ts
  src/services/locator/block.proxy.ts        # импортирует из ./types
  ```
  ```
  src/components/types/page.ts
  src/components/types/form.ts
  src/components/types/locator.ts            # много типов → папка types/
  ```
- Не храни типы вместе с implementation-файлами.

## Files

- 1 класс = 1 файл. Имя файла — имя класса в kebab-case.
  ```
  LocatorService        → locator.service.ts
  LocatorRegionProxy    → region.proxy.ts
  LocatorBlockProxy     → block.proxy.ts
  HomePage              → home.page.ts
  ```
- Суффикс файла отражает назначение: `.service.ts`, `.proxy.ts`, `.page.ts`, `.spec.ts`.
