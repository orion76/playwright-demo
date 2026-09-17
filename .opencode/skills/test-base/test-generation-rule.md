# Test Generation Rule

Правила генерации тестового файла. Подключается командами `/write-ideal-test`, `/write-crash-test`, `/update-crash-test`.

## Шаблон

@.opencode/skills/test-base/boilerplate.md

## Конвенции

@.opencode/skills/test-base/conventions.md

## Локаторы

При создании `app/<route>/locators.yml` для каждого элемента перебирай стратегии из `app/config.yml` → `locator_strategies` по порядку. Первая успешная — используй:

| Стратегия | Как ищем | Когда применимо |
|---|---|---|
| `data-qa` | `data-qa` атрибут (или `data-testid`, `data-test`) | Элемент с data-атрибутом — самый надёжный |
| `role` | `getByRole` с текстом из `locales.yaml` | Есть accessible name, нет конфликтов |
| `placeholder` | `getByPlaceholder` | Поле ввода с placeholder |
| `label` | `getByLabel` | Поле с `<label for="...">` |
| `text` | `getByText` | Текстовый блок (параграф, спан) |
| `css` | `page.locator(selector)` | Только если альтернативы нет — селектор хрупкий |

## Правила кода

@.opencode/skills/test-base/test-code-rules.md

## Shared-функция

Логика теста выносится в shared-функцию, файлы комбинаций только вызывают её с параметрами:

```
tests/<route>/ideal/
  shared/
    <scenario>.ts                    # функция с логикой
  <scenario>--<viewport>--<role>--<lang>.spec.ts   # вызывает shared
```

### shared/<scenario>.ts

```ts
import { Page, expect } from "@playwright/test";
import { initPage } from "@src/pages/init";
import type { UViewport } from "@src/types";

export interface ScenarioOpts {
  viewport: UViewport;
  role: string;
  lang: string;
}

export async function testScenario(page: Page, opts: ScenarioOpts) {
  // opts.viewport, opts.lang, opts.role — используй где нужно
  const po = initPage(page, "<route>", opts.viewport);
}
```

### Файл комбинации

```ts
import { test, VIEWPORTS } from "@src/fixtures/test";
import { testScenario } from "./shared/<scenario>";

test.use({ viewport: VIEWPORTS.desktop });

test("<название>", async ({ page }) => {
  await testScenario(page, { viewport: "desktop", role: "guest", lang: "en" });
});
```

### Правила

- Shared-функция в `tests/<route>/ideal/shared/<scenario>.ts`
- Комбинации в `tests/<route>/ideal/<scenario>--<viewport>--<role>--<lang>.spec.ts`
- Каждая комбинация импортирует shared-функцию и вызывает с нужными параметрами
- Импорт: `import { test, VIEWPORTS } from "@src/fixtures/test"`
- `test.use({ viewport: VIEWPORTS.<desktop|mobile|tablet> })` — обязателен, задаёт разрешение экрана
- Параметры `viewport`, `role`, `lang` передаются в функцию, если нужны для логики

## Allure

- Каждый шаг сценария — `test.step("...", async () => {...})`
- Annotations в начале теста:
  ```ts
  test.info().annotations.push(
    { type: "feature", description: "<название_фичи>" },
    { type: "story", description: "<описание_сценария>" },
    { type: "severity", description: "<blocker|critical|normal|minor|trivial>" },
  );
  ```

## Переменные

- `$userName`, `$userEmail` и т.п. из `.prompt.md` → подставить реальные значения
- Уникальные данные: `Date.now()` или `crypto.randomUUID()` для email/name
- Если в .prompt.md есть `$user` — использовать `getPhone()` из `src/auth.ts`
- Если в .prompt.md есть `$eventName` — использовать `getTestEvent()` из `src/events.ts`

## Кастомные контроллы

Если сценарий использует нестандартные поля — используй классы из `src/controls/`:
- `DatepickerControl` — выбор даты
- `FileUploadControl` — загрузка файлов
- `OtpControl` — ввод OTP-кода
- `ReactSelectControl` — выбор из react-select
- `RichTextControl` — rich-text редактор
