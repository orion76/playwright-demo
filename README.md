# playwright-demo

Демонстрация возможностей **Playwright**, **ИИ** (OpenCode) и кастомного **PageObject-фреймворка** (`src/`) для генерации и выполнения E2E-тестов.

Целевой сайт: [`https://automationexercise.com`](https://automationexercise.com)

Автор: [Paul Glazkow](https://github.com/orion76)

---

## Возможности

- **AI-генерация тестов** — написание сценариев и тестов через OpenCode-команды
- **Мультиязычность** — поддержка любого языка с переключением на лету
- **Три вьюпорта** — desktop (1440×900), mobile (375×812), tablet (768×1024)
- **Две роли** — guest (неавторизован) и registered (авторизован)
- **Комбинаторные тесты** — автоматическая генерация файлов под каждую комбинацию `viewport × role × lang`
- **YAML-конфигурация страниц** — структура, локаторы и переводы лежат в `app/<route>/`
- **Allure-отчёты** с деплоем на GitHub Pages (даже при падении тестов)
- **Crash-тесты** — генерация тестов на граничные и некорректные данные
- **Демонстрация падений** — специальный тест `error-demo` для показа артефактов (скриншотов, видео, trace)

---

## Архитектура

### PageObject (3 уровня)

Фреймворк реализует трёхуровневую иерархию: **Region → Block → Element**.

```
po.region("header").block("nav").element("signupLogin")
  │         │           │              └── Locator (Playwright)
  │         │           └── LocatorBlockProxy — резолвит стратегию из YAML
  │         └── LocatorRegionProxy — проксирует в block
  └── PageObject.region() — входная точка
```

**Стратегии локаторов** (задаются в `locators.yml`):

| Стратегия     | Описание                               |
| ------------- | -------------------------------------- |
| `role`        | `page.getByRole(role, { name: text })` |
| `text`        | `page.getByText(text)`                 |
| `label`       | `page.getByLabel(text)`                |
| `placeholder` | `page.getByPlaceholder(text)`          |
| `css`         | `page.locator(selector)`               |

Текст для стратегий `role`, `text`, `label`, `placeholder` подставляется из файла переводов `locales.yaml` согласно текущему языку.

### i18n

- **`LangService`** — хранит активный язык (например `en`)
- **`TranslationService`** — резолвит строку по ключу: `locales.yaml[region][block][key][lang]`
- Если перевод не найден — используется ключ элемента (fallback)

### Инициализация страницы

```ts
import { initPage } from '@src/pages/init';

const po = initPage(page, 'login', 'desktop');
await po.navigate();
await po.region('main').block('loginForm').element('title').toBeVisible();
```

`initPage()` читает `app/<route>/locators.yml` и `app/<route>/locales.yaml`, создаёт `PageObject` со всеми сервисами.

### AI-генерация (OpenCode)

Команды в `.opencode/commands/` и скиллы в `.opencode/skills/`:

| Команда                       | Назначение                                        |
| ----------------------------- | ------------------------------------------------- |
| `/write-ideal-scenario`       | Генерация спецификации сценария                   |
| `/write-ideal-test`           | Генерация теста по сценарию                       |
| `/write-crash-plan`           | План crash-тестов для маршрута                    |
| `/write-crash-test`           | Генерация crash-теста                             |
| `/collect-data`               | Сбор данных со страницы (структура, сеть, локали) |
| `/check-locales`              | Проверка переводов на дублирующиеся значения      |
| `/browser-open`               | Открытие браузера с auth-сессией                  |
| `/debug-tests -- path=<path>` | Дебаг конкретного теста                           |
| `/logs [YYYY-MM-DD]`          | Чтение логов сессии                               |

Дополнительно: MCP-сервер `@playwright/mcp` для прямого управления браузером из ИИ.

---

## Структура проекта

```
playwright-demo/
├── app/
│   ├── config.yml              — конфигурация (языки, вьюпорты, users)
│   ├── _home/                  — маршрут "/"
│   │   ├── locators.yml        — описания локаторов
│   │   ├── locales.yaml        — переводы для поддерживаемых языков
│   │   ├── structure.yaml      — структура страницы
│   │   ├── _status.yml         — статус сценариев
│   │   └── spec/               — .prompt.md файлы сценариев
│   ├── login/
│   ├── products/
│   ├── product_details/
│   ├── view_cart/
│   ├── contact_us/
│   ├── signup/
│   ├── account_created/
│   ├── delete_account/
│   ├── checkout/
│   └── payment/
├── src/
│   ├── pages/
│   │   ├── page.object.ts      — основной класс PageObject
│   │   ├── page.factory.ts     — фабрика, собирающая сервисы
│   │   └── init.ts             — initPage() — точка входа
│   ├── services/
│   │   ├── locator/            — LocatorService, RegionProxy, BlockProxy
│   │   ├── translation/        — TranslationService, RegionProxy, BlockProxy
│   │   ├── lang.service.ts     — LangService
│   │   └── test.service.ts     — TestService (open + navigate)
│   ├── controls/               — контролы: datepicker, otp, file-upload и др.
│   ├── fixtures/               — test.extend() с плагинами (connectivity, trace)
│   ├── api/accounts.ts         — API-хелперы (createAccount, deleteAccount)
│   ├── auth.ts                 — работа с тестовыми пользователями
│   ├── config.ts               — загрузка конфигурации
│   ├── toasts.ts               — сбор toast-уведомлений
│   ├── fixes.ts                — application of bug fixes
│   └── types.ts                — типы: ULanguage, UViewport, URole и др.
├── tests/
│   ├── _home/ideal/            — тесты для "/"
│   ├── login/ideal/
│   ├── products/ideal/
│   ├── product_details/ideal/
│   ├── view_cart/ideal/
│   ├── contact_us/ideal/
│   └── error-demo/             — демонстрация падений
├── scripts/                    — утилиты (генерация, отладка, отчёты)
├── .opencode/
│   ├── commands/               — OpenCode-команды
│   ├── skills/                 — OpenCode-скиллы
│   ├── prompts/                — шаблоны промптов
│   ├── plans/                  — планы crash-тестов
│   └── rules/                  — правила для AI
├── .github/workflows/
│   ├── e2e.yml                 — CI: Playwright → Allure → GitHub Pages
│   └── test.yml                — CI: ручной запуск тестов
├── playwright.config.js        — конфиг Playwright
├── opencode.json               — конфиг OpenCode (MCP, LSP, skills)
├── tsconfig.json               — @src/* алиас
└── package.json
```

---

## Быстрый старт

```bash
# Установка
npm install
npx playwright install

# Запуск всех тестов
npx playwright test

# С указанием URL (по умолчанию https://automationexercise.com)
SITE_URL=https://example.com npx playwright test

# Дебаг одного теста
npx playwright test --debug tests/login/ideal/login-correct--desktop--guest--en.spec.ts

# Allure-отчёт
npm run allure:generate && npm run allure:open
```

---

## CI/CD

GitHub Actions workflow (`.github/workflows/e2e.yml`):

1. Установка зависимостей и Chromium
2. Восстановление auth-состояния (для тестов registered)
3. Запуск Playwright-тестов (2 воркера, таймаут 120s)
4. Загрузка артефактов: `playwright-report/`, `test-results/`, `allure-results/`
5. Генерация Allure-отчёта
6. Деплой Allure-отчёта на GitHub Pages
   — выполняется **даже при падении тестов**

---

## Соглашения

- **Имена тестовых файлов**: `<scenario>--<viewport>--<role>--<lang>.spec.ts`
- **Доступ к элементам**: только через `po.region().block().element()`, никогда через `page.getBy*()` напрямую
- **Allure-аннотации**: `feature`, `story`, `severity` в начале каждого теста
- **Шаги сценария**: обёрнуты в `test.step("...", ...)`
- **Язык**: весь код и комментарии на английском
- **Форматирование**: Prettier (одинарные кавычки, trailing commas, 100 символов)
- **Юнит-тесты**: Vitest (файлы в `unit-tests/`)
