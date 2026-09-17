# playwright-demo

Playwright e2e tests against a Shopify demo store.

**Current target**: `https://automationexercise.com` (см. `app/config.yml` → `languages`, `app/_home/spec/`).

## Quick start

```bash
npm install
npx playwright install
```

## Key facts

- **Test runner**: `@playwright/test` v1.60. Config in `playwright.config.js`.
- **Path alias**: `@src/*` maps to `src/*` (configured in `tsconfig.json`).
- **Formatter**: Prettier (defaults — `.prettierrc` not set).
- **Unit tests**: Vitest (files in `unit-tests/`).
- **Reporting**: `allure-playwright` configured; Allure results in `allure-results/`, HTML report via `npm run allure:generate && npm run allure:open`.
- **CI**: GitHub Actions workflow in `.github/workflows/test.yml`. Триггеры: `workflow_dispatch` (ручной), `pull_request`, `schedule` (ежедневно в 5:00).
- **MCP**: `@playwright/mcp` configured in `opencode.json`.
- **YAML**: `js-yaml` library.
- **DB**: `better-sqlite3` for dump-conversation script.

## Project variables

| Variable | Source | Description |
|---|---|---|
| `SITE_URL` | `.env` (key `SITE_URL`) → `src/config.ts` (fallback) | Target site URL. Override: `SITE_URL=<url> npx playwright test` |
| `DEFAULT_LANGUAGE` | `src/config.ts` | Default test language (`en`) |
| `LANGUAGES` | `app/config.yml` → `src/config.ts` | Supported interface languages (e.g. `en`) |
| `HAR_PATH` | `src/config.ts` | HAR file path (`data/api-only.har`) |
| `locator_strategies` | `app/config.yml` | Priority chain for locator generation (`data-qa` → `role` → ...) |
| `allure-results/` | generated | Allure raw results (gitignored) |
| `allure-report/` | `npm run allure:generate` | Allure HTML report (gitignored) |

## OpenCode framework

Commands in `.opencode/commands/`, skills in `.opencode/skills/`.

| Command | Purpose |
|---|---|
| `/write-ideal-scenario <route> [scenario]` | Generate ideal scenario spec |
| `/write-ideal-test <route>` | Generate ideal test (2-phase: base + all combos) |
| `/write-crash-plan <route> <topic>` | Generate crash-test plan |
| `/write-crash-test <route> <plan>` | Generate crash test |
| `/update-crash-test <route> <plan>` | Refine existing crash test |
| `/debug-tests -- path=<path>` | Debug a test |
| `/collect-data <route>` | Collect page data (structure, network, locales) |
| `/check-locales` | Check for duplicate translation values |
| `/logs [YYYY-MM-DD]` | Read session logs |
| `/browser-open` | Open browser with auth session |

## Project structure

| Directory / File | Purpose |
|---|---|
| `src/config.ts` | App config (`SITE_URL`) |
| `src/` | POM framework (services, pages, controls) |
| `app/config.yml` | Test environment config (users, viewports) |
| `app/<route>/` | Page data per route (structure, locales, specs) |
| `tests/<route>/` | e2e test files per route |
| `scripts/` | helper scripts |
| `opencode-plugins/` | OpenCode plugins (logging, tracking) |
| `.opencode/` | OpenCode commands, skills, prompts, plans |
| `.history/` | auto-generated, do not edit |

## Conventions

- Use `@playwright/test` APIs (`test`, `expect`) for e2e tests.
- Import from `@src/...` using the configured alias.
- Format with `npx prettier --write .` before committing.
- Tests live in `tests/` at the repo root.
- Test names and code comments in English only.
- Locators only through PageObject (`region().block().element()`).
- Test files: `<name>--<viewport>--<role>--<lang>.spec.ts` (см. route-structure.md).
- Allure: каждый шаг сценария — `test.step("...", ...)`, annotations в начале теста (`feature`, `story`, `severity`).
