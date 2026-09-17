---
name: manage-auth
description: 'Use when asked to refresh auth or when running the /refresh-auth command. Opens headed browser for manual login, saves auth/<user>.json for test use.'
---

# Refresh Auth State

Обновляет `auth/<name>.json` — cookies + localStorage для авторизованных тестов.

## Как использовать

Скажи: `обнови токен` или `обнови user.json` или `сохрани auth`.

## Процесс

1. Запусти:
   ```bash
   TEST_USER=organizer npx tsx scripts/refresh-auth.ts
   ```
2. Откроется браузер со страницей `/login`
3. **Пользователь** вручную логинится
4. После редиректа с `/login` — состояние сохраняется в `auth/<key>.json`
5. Браузер закроется сам

Без `TEST_USER` — по умолчанию `organizer`.

## Формат

`auth/<name>.json` (Playwright `storageState`):
```json
{
  "cookies": [],
  "origins": [{
    "origin": "https://sauce-demo.myshopify.com",
    "localStorage": [
      { "name": "token", "value": "..." },
      { "name": "activeLanguage", "value": "en" }
    ]
  }]
}
```

## Связь с app/config.yml

Тестовые пользователи описаны в `app/config.yml` в разделе `test_users`.
Каждый пользователь имеет:
- `phone` — номер для входа
- `auth_type` — `ui_form` (через форму) или `cookie` (через куку)
- `roles` — какие роли доступны (например `[authorized, buyer]`)
- `cookie_file` — (только для `auth_type: cookie`) путь к файлу кук

Путь к storageState определяется через `getStorageState(userKey)` из `src/auth.ts`:
- Для `cookie` — возвращает `cookie_file` из конфига
- Для `ui_form` — возвращает `auth/<userKey>.json`

## Когда обновлять

- При первом запуске тестов
- Когда сессия истекла (тесты падают с 401)
- Раз в несколько дней
