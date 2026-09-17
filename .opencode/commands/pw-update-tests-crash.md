---
description: 'Обновление crash-теста. Аргументы передаются в pw-get-scenarios для фильтрации сценариев.'
aliases: [pwu-tc]
---

Обнови краш-тест.

Аргументы команды (r, t, s) передаются в `@.opencode/commands/pw-get-scenarios.md` для получения списка сценариев.

1. @.opencode/skills/check-connectivity/SKILL.md

2. Получи список сценариев через `@.opencode/commands/pw-get-scenarios.md` с переданными аргументами.

3. Для каждого сценария `<r>/<t>`:

4. Прочитай `app/<r>/constraints.yaml` (если есть).

5. Прочитай `app/<r>/plans/<p>.md` — план атаки.

6. Найди текущий тест — через `@.opencode/commands/pw-get-tests.md` с `r=<r> t=<p>`.

7. Открой страницу через `browser_snapshot` или спроси пользователя.

8. Перепиши тест, следуя @.opencode/skills/test-base/test-generation-rule.md.

9. Запусти с HTML-отчётом: `rm -rf test-results && node scripts/run-with-report.js "tests/<r>/plans/<p>.spec.ts" -- --workers 1 --timeout 120000`

10. Открой трейс и HTML-отчёт.

11. Сообщи пользователю результат.
