---
name: test-base
description: Base skill for Playwright E2E tests. Provides route-structure, spec-format, conventions, and boilerplate used by any test-related skill or command.
---

# Write Playwright Test

This project uses `@playwright/test` v1.60 with Chromium only.

## Pre-requisite

1. @.opencode/skills/check-connectivity/SKILL.md
2. Корневой роут (`/`) использует папку `app/_home/` (не `app/`). Подробнее: @.opencode/skills/test-base/route-structure.md.
3. Проверь `app/<route>/constraints.yaml` — если существует, соблюдай все правила.

## Config

- `playwright.config.js` — headless by default, `--start-maximized` launch arg
- HAR files in `./data/`
- Browser: chromium-1223 at `/home/pasha/.cache/ms-playwright/`
- `app/config.yml` — глобальная конфигурация тестового окружения:
  - `languages` — языки интерфейса (из `app/config.yml`)
  - `locator_strategies` — приоритетная цепочка для генерации локаторов (`data-qa` → `role` → ...)
  - `user_roles` — список ролей (guest, authorized, buyer, organizer)
  - `auth_type` — способы авторизации (ui_form, cookie)
  - `test_users` — тестовые пользователи с полями `phone`, `roles`, `auth_type`
  - `test_events` — тестовые события
  - `viewports` — разрешения экрана (desktop, mobile)

## Workflow

### 1. Генерация базового теста

Сначала генерируется **один** базовый тест — для отладки. Параметры по умолчанию:
- `viewport: desktop`
- `lang` — `DEFAULT_LANGUAGE` (см. AGENTS.md → Project variables)
- `role` — первый из списка (если несколько)

```
tests/<route>/[name].ideal.spec.ts
```

### 2. Отладка

Запусти и отладь базовый тест. Если тест падает — исправляй сценарий, локаторы, логику теста до зелёного.

**Важно:** если в процессе отладки в тесте появились новые элементы, которых нет в данных роута — сразу добавь их в `structure.yaml`, `locators.yml` и `locales.yaml`. Без этого тест не сможет работать через PageObject.

Для изоляции используй `test.only` — запустится только он, остальные будут пропущены. После отладки удали `.only`.

### 3. Генерация остальных тестов

После отладки базового теста сгенерируй остальные тесты для этого роута по правилам именования из @.opencode/skills/test-base/route-structure.md.

### Команды

```
npm test                           # все тесты
npx playwright test <pattern>      # конкретные тесты
npx playwright test --ui           # UI-режим
npm run test:debug                 # debug-режим
```

### Статусы сценариев

| Статус | Описание |
|--------|----------|
| `base_test_generated` | Сгенерирован базовый тест (desktop, EN, первый role) |
| `base_test_debugged` | Базовый тест отлажен |
| `test_generated` | Сгенерированы все комбинации |

### Команды генерации

Параметры можно передавать:
- **именованно**: `-- route=<route> [scenario=<id>]`
- **позиционно**: первый аргумент → `route`, второй → `scenario` (где применимо)

```
# /write-ideal-scenario <route> [scenario]
/write-ideal-scenario -- route=<route> [scenario=<id>]
  → пишет spec/<id>.md для сценариев, у которых статус НЕ равен scenario_written/base_test_generated/test_generated/completed
  → если scenario не указан — выбирает первый подходящий из _prompt.md

# .write-scenario-test <route> <scenario>
.write-scenario-test -- route=<route> scenario=<name>
  → двухфазная генерация: сначала базовый тест (desktop, EN), после отладки — все комбинации

# .write-crash-test <route> <plan>
.write-crash-test -- route=<route> plan=<topic>
  → генерация plan-теста в tests/<route>/plans/<plan-name>--<viewport>--<role>--<lang>.spec.ts

# /update-crash-test <route> <plan>
/update-crash-test -- route=<route> plan=<topic>
  → доработка существующего краш-теста в tests/<route>/plans/
```

### Перед любой операцией

Прочитать `app/<route>/_prompt.md` и `app/<route>/_status.yml`:
- `_prompt.md` — список сценариев (ID + описание)
- `_status.yml` — последний завершённый этап для каждого сценария
- Если файлов нет — работать как обычно (без проверки статусов)

## Прикреплённые файлы

| Файл | Описание |
|------|----------|
| @.opencode/skills/test-base/route-structure.md | Структура `app/<route>/` и `tests/<route>/` |
| @.opencode/skills/test-base/spec-format.md | Формат spec-сценариев (`spec/*.md`) |
| @.opencode/skills/test-base/conventions.md | Импорты, локаторы, HAR, соглашения |
| @.opencode/skills/test-base/boilerplate.md | POM-шаблон с примерами кода |
| @.opencode/skills/test-base/test-code-rules.md | Правила генерации кода: assert после fill, проверка чекбоксов, ожидание переходов |
| @.opencode/skills/test-base/test-generation-rule.md | Общие правила генерации тестов (Allure, переменные, контроллы) |
| @.opencode/skills/test-base/test-spec-rule.md | Правила генерации идеальных сценариев (`spec/*.md`) |
| `app/<route>/constraints.yaml` | Правила защиты бэкенда для данного роута |
