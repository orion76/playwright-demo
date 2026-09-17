---
name: extract-locales
description: 'Use when you need to extract or update translations for a page route. Scrapes text from elements matching PAGE_LOCATORS structure, and saves into app/<route>/locales.yaml.'
---

# Extract Locales

Извлекает тексты элементов со страницы для указанного роута и сохраняет в `app/<route>/locales.yaml`.
Языки берутся из `app/config.yml` → `languages`.

## Предусловие

1. Приложение доступно (см. @.opencode/skills/check-connectivity/SKILL.md)
2. Структура страницы уже описана в `app/<route>/structure.yaml`
3. Папка `app/<route>/` существует (создаётся на `/analyze-page`)

**После завершения — остановись и жди команды "продолжить".**

## Формат locales.yaml

```yaml
# Ключи повторяют структуру PAGE_LOCATORS
# Значение — пара { en }
region:
  block:
    elementKey: { en: "English text" }
```

## Процесс

### 1. Переключиться на EN

Язык хранится в `localStorage.activeLanguage`. Переключи без UI:

```js
await page.evaluate(() => localStorage.setItem("activeLanguage", "en"));
await page.reload({ waitUntil: "networkidle" });
```

### 2. Собрать тексты на EN

Для каждого элемента из `PAGE_LOCATORS.<page>`:

- **`by: 'role'`** — `page.getByRole(role)` → брать `.first()` → `.textContent()`
- **`by: 'text'`** — элемент ищется по тексту, но мы его ещё не знаем. Использовать `page.locator(...)` по CSS-контексту (родительский блок) или пропустить.

Результат сохранить в переменную `enTexts`.

### 3. Записать

```yaml
# app/<route>/locales.yaml
<region>:
  <block>:
    <element>: { en: "<текст>" }
```

## Нюансы

- Некоторые элементы могут быть скрыты при текущем viewport. Для них переключи viewport на мобильный (375px) или используй `{ force: true }` для клика/чтения.
- Пустые тексты (логотип — изображение без alt) — пропускай.
