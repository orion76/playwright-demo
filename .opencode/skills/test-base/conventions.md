# Conventions

## Constraints

Перед любыми действиями с тестами проверь `app/<route>/constraints.yaml`:
- Соблюдай все `rules` — они защищают бэкенд от неконтролируемых мутаций
- Используй предложенные `template` для полей (eventName, даты и т.д.)
- Если указан `mode: har` — не отправляй мутирующие запросы напрямую на бэкенд

## Imports

- Import from `@playwright/test`
- Import shared config from `src/config.ts`: `SITE_URL`, `HAR_PATH`, `DEFAULT_LANGUAGE`
- Page-контекст через `TestService.open("<route>")` из `src/services/test.service`
- Use `DEFAULT_LANGUAGE` from config (`"en"`)

## Service Workers

```ts
test.use({ serviceWorkers: "block" });
```

## HAR

```ts
await page.routeFromHAR(HAR_PATH, {
  url: "**" + new URL(SITE_URL).host + "/**",
});
```

## Locators

- **Все локаторы — только через PageObject (`region().block().element()`).**
  Никаких `page.getByRole()`, `page.getByText()` и т.п. напрямую в тесте.
  Если нужного локатора нет в `locators.yml` — сначала добавь его туда.
  Это гарантирует работу теста при смене языка.
- Prefer `getByRole`, `getByText`, `getByPlaceholder` locators over CSS/XPath
- Use `await page.waitForURL("**/path")` after navigation clicks
- Use `debugger;` statement inside route handlers for debugging
- Use `isBackendRequest()` helper to match backend routes by path fragment
