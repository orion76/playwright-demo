---
description: 'Сбор данных о странице для всех viewport: анализ структуры, сетевых запросов, извлечение переводов. Создаёт structure.yaml (с полем used), network.yaml, locales.yaml, locators.yml, links.md, spec/*.md в app/<route>/'
aliases: [pwcd]
---

Выполни сбор данных для роута `<route>`.

1. @.opencode/skills/check-connectivity/SKILL.md

2. Убедись что `<route>` передан (например `event/create`).

3. Прочитай `app/config.yml` — глобальная конфигурация окружения:
   - `locator_strategies` — приоритетная цепочка типов локаторов (`data-qa` → `role` → ...)
   - `viewports` — список viewport для сбора данных. Каждый viewport может иметь поля:
     - `width`, `height` — разрешение
     - `disabled: true` — (опционально) исключить из сбора
     - `default: true/false` — (опционально) основной viewport
   - `user_roles` — список ролей пользователей (guest, authorized, buyer, organizer)
   - `auth_type` — способы авторизации (ui_form, cookie)
   - `test_users` — тестовые пользователи (phone, roles, auth_type)
   - `test_events` — тестовые события

4. Найди `.prompt.md`-файл для текущей задачи:
   - Проверь `app/<route>/collect-data.prompt.md`
   - Если файл существует — прочитай его и используй как дополнительный контекст
   - Если файла нет — продолжай без него

5. Создай `app/<route>/` если её нет.

6. **Цикл по всем viewport.** Для каждого viewport (например `desktop`, `mobile`, `tablet`):

   6.1 Открой страницу: `TestService.open("<route>")` или `browser_navigate(...)` (SITE_URL — см. AGENTS.md → Project variables).
       - Если `route=/` → открой `SITE_URL` (папка данных `app/_home/`)
       - Иначе → открой `SITE_URL + "/" + route` (папка данных `app/<route>/`)

   6.2 Смени разрешение: `browser_resize(width, height)` согласно `viewports.<name>` из `app/config.yml`.

   6.3 Сними `browser_snapshot` (глубина 5+, `boxes: true`).

   6.4 Запиши, какие элементы видны на этом разрешении.
       - Если это **default** viewport (помечен `default: true`) — раздели страницу на регионы и блоки, как обычно
       - Если это **остальные** — сравни с default: какие элементы есть, каких нет
       - Для элементов, присутствующих на всех viewport — `used` не указывай
       - Для элементов, присутствующих только на некоторых — добавь `used: [viewport1, viewport2]`
       - Пропусти viewport c `disabled: true`

7. **Сетевые запросы:** сними один раз (на первом viewport) через `browser_network_requests(static=false)`.

8. Найди и раскрой все **dropdown-элементы** на десктопе (меню пользователя, фильтры, селекты):
   - Используй `expandAllDropdowns()` из `src/scripts/collect-data.ts`
   - Затем `expandMenuByText()` / `expandMenuByRole()` — для конкретных элементов
   - Добавь найденные ссылки в `links.md` как отдельные блоки

9. Сохрани `app/<route>/structure.yaml` — регионы, блоки, поля, локаторы.
   - Для каждого элемента выбирай тип локатора по `locator_strategies` из `app/config.yml`.
   - Для элементов не на всех viewport — укажи `used: [desktop, tablet]` или `used: [mobile]`

10. Если есть сетевые запросы — сохрани `app/<route>/network.yaml`.

11. Сохрани `app/<route>/links.md` — все ссылки и кнопки на странице, сгруппированные по регионам и блокам:
    - Для ссылок (`role=link`) — укажи URL (href)
    - Для кнопок (`role=button`) — опиши действие
    - Если элемент имеет и EN и HE текст — укажи оба
    - Пропусти дублирующиеся системные элементы (accessibility, иконки без текста)
    - **Раскрывай дропдауны** (меню пользователя, фильтры) — кликни по ним, чтобы получить их содержимое
    - После клика по дропдауну — сними snapshot и запиши найденные ссылки/кнопки

12. Запусти извлечение переводов: следуй @.opencode/skills/extract-locales/SKILL.md

13. Сгенерируй локаторы: `node scripts/generate-locators.js <route>`

14. Открой страницу повторно на десктопе через `browser_snapshot` и убедись что все файлы корректны.

15. Сообщи пользователю что собрано:
    - `structure.yaml` — структура (с `used` для viewport-специфичных элементов)
    - `network.yaml` — сетевые запросы
    - `spec/*.md` — сценарии (только если созданы)
    - `links.md` — ссылки и кнопки
    - `locales.yaml` — переводы
    - `locators.yml` — Playwright-локаторы

Подробная инструкция: @.opencode/skills/analyze-page/SKILL.md
