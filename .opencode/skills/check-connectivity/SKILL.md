---
name: check-connectivity
description: Use before any page analysis or test run. Verifies the target app is reachable. If unreachable, reminds the user to check connectivity.
---

# Check Connectivity

Приложение должно быть доступно по `SITE_URL` (см. AGENTS.md → Project variables).

## Порядок проверки

1. Прочитай `SITE_URL` (см. AGENTS.md → Project variables).
2. Попробуй открыть `SITE_URL` через `browser_navigate`.
2. Дождись загрузки (`waitForLoadState` или `browser_snapshot`).
3. Если страница загрузилась (статус 200, есть HTML-контент) — всё ок, можно продолжать.
4. Если страница **не загрузилась** — **остановись** и верни пользователю сообщение:

   ```
   ⚠️ Приложение недоступно. Проверь SITE_URL (см. AGENTS.md → Project variables).
   Проверь, что URL открывается в браузере, и запусти задачу заново.
   ```

## Интеграция

Этот скил выполняется **перед** каждым шагом, который работает с приложением:
- перед `/analyze-page`
- перед генерацией POM (если нужна сверка с живой страницей)
- перед `/write-test` и прогоном теста

В промптах задач добавляй шаг "Проверка доступности" первым пунктом.
