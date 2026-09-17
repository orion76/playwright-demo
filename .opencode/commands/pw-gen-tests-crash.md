---
description: 'Генерация crash-теста. Аргументы передаются в pw-get-scenarios для фильтрации сценариев.'
aliases: [pwg-tc]
---

Сгенерируй crash-тест.

Аргументы команды (r, t, s) передаются в `@.opencode/commands/pw-get-scenarios.md` для получения списка сценариев.

1. @.opencode/skills/check-connectivity/SKILL.md

2. Получи список сценариев через `@.opencode/commands/pw-get-scenarios.md` с переданными аргументами.

3. Для каждого сценария `<r>/<t>`:

4. Прочитай `app/<r>/spec/<t>.md` — сценарий идеального поведения.

5. Прочитай `app/<r>/plans/<p>.md` — описание атаки.

6. Проверь, существует ли уже тест — через `@.opencode/commands/pw-get-tests.md` с `r=<r> t=<p>`.

7. Напиши тест, следуя @.opencode/skills/test-base/test-generation-rule.md.

8. Сохрани: `tests/<r>/plans/<p>--<viewport>--<role>--<lang>.spec.ts`

9. Обнови `_status.yml` → `test_generated`.

Подробная инструкция: @.opencode/skills/test-base/SKILL.md
