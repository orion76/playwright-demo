---
description: 'Генерация плана краш-теста для роута. Аргументы передаются в pw-get-scenarios.'
aliases: [pwg-pc]
---

Сгенерируй план краш-теста.

Аргументы команды (r, t, s) передаются в `@.opencode/commands/pw-get-scenarios.md` для получения списка сценариев.

1. @.opencode/skills/check-connectivity/SKILL.md

2. Получи список сценариев через `@.opencode/commands/pw-get-scenarios.md` с переданными аргументами.

3. Для каждого сценария:
   - Извлеки `<r>` (роут) и `<t>` (имя сценария)

4. Найди `.prompt.md`-файл: `app/<r>/plans/<p>.prompt.md`

5. Прочитай `.opencode/plans/topics.yaml` — найди тему по `<p>`.

6. Прочитай `app/<r>/spec/<t>.md` — сценарий идеального поведения.

7. Прочитай `app/<r>/locators.yml` и `locales.yaml`.

8. Открой страницу через `browser_snapshot`.

9. Для каждого `checks` из темы придумай конкретный сценарий.

10. Сохрани результат в `app/<r>/plans/<p>.md`.

11. Сообщи пользователю что план создан: `/pwg-tc r=<r> p=<p>`

Подробная инструкция: @.opencode/skills/test-base/SKILL.md
