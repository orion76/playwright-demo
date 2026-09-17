---
name: analyze-page
description: 'Use when running the /analyze-page command or when asked to analyze a page structure. Maps UI regions to IPageStructure/IPageRegion/UPageBlock types from src/components/types/.'
---

# Analyze Page

Сбор информации о странице. Результат сохраняется в `app/<route>/`.

**После завершения — остановись и жди команды "продолжить".**

## Типы — src/components/types/

Типы структуры страницы описаны в файлах:
- `src/components/types/locator.ts` — `ILocator { type, value }`
- `src/components/types/form.ts` — `IFormField { name, locator }`
- `src/components/types/page-blocks.ts` — `IPageBlock`, `IPageBlockCard`, `IPageBlockForm`, `IPageBlockMenu`, `UPageBlock`
- `src/components/types/page.ts` — `IPageRegion { name, blocks }`, `IPageStructure { name, regions }`

При анализе используй эти типы. Актуальная структура — в исходниках, не копируй сюда.

## Определение блоков

| Тип | Признаки |
|-----|----------|
| **card** | Информационный блок: заголовок + контент (текст, медиа, таблица). Нет интерактивных полей ввода. |
| **menu** | Навигационный блок: заголовок + список ссылок/кнопок. Пункты ведут на другие страницы или вызывают действия. |
| **form** | Форма ввода: заголовок + поля ввода (input, select, textarea, checkbox, radio, button[type=submit]). |

## Pre-requisite: доступность приложения

Перед анализом выполни проверку доступности (см. AGENTS.md → Project variables → SITE_URL):

@.opencode/skills/check-connectivity/SKILL.md

## Процесс анализа

1. Открой страницу (`browser_navigate`).
2. Сними `browser_snapshot` с глубиной 5+ и `boxes: true`.
3. Раздели страницу на **регионы** (шапка, сайдбар, основной контент, футер).
4. Внутри каждого региона выдели **блоки** и определи их тип (`card`/`menu`/`form`).
5. Для каждого элемента подбери **надежный Playwright-локатор**:
   - `page.getByRole('heading', { name: '...' })`
   - `page.getByRole('button', { name: '...' })`
   - `page.getByLabel('...')`
   - `page.getByPlaceholder('...')`
   - `page.getByText('...')`
   - CSS/XPath — только если альтернативы нет.

## Формат отчёта

Верни структурированный Markdown с YAML-блоком `page_structure`:

```yaml
page_structure:
  name: "Название страницы"
  regions:
    - name: "region-name"
      blocks:
        - type: "card"
          name: "block-name"
          title:
            type: "getByRole"
            value: "heading, { name: 'Заголовок' }"
          content:
            type: "getByText"
            value: "Текстовое содержимое"
        - type: "menu"
          name: "block-name"
          title:
            type: "getByRole"
            value: "heading, { name: 'Меню' }"
          fields:
            - name: "Пункт 1"
              locator:
                type: "getByRole"
                value: "link, { name: 'Пункт 1' }"
        - type: "form"
          name: "block-name"
          title:
            type: "getByRole"
            value: "heading, { name: 'Форма' }"
          fields:
            - name: "Имя поля"
              locator:
                type: "getByLabel"
                value: "Метка поля"
```

После YAML добавь текстовый анализ: заметки по сетевым запросам, динамическим элементам, iframe, обработчикам событий.

## Сохранение результата

1. Определи имя задачи из URL: `/billing/invoice-settings` → `billing-invoice-settings`.
2. Создай папку `app/<route>/` — структура страницы.
3. Сохрани:
   - `structure.yaml` — регионы, блоки, локаторы (без корневого `page_structure`)
   - `network.yaml` — сетевые запросы страницы
   - `issues.yaml` — известные проблемы/заметки
4. После анализа страницы **запусти `extract-locales`** — извлечёт переводы текстовых строк со страницы в `locales.yaml`.
5. Затем **запусти `generate-locators`** (`node scripts/generate-locators.js <route>`) — сгенерирует `locators.yml` из `structure.yaml` + `locales.yaml`.
