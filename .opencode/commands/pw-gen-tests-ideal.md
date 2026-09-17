---
description: 'Генерация идеального теста. Аргументы передаются в pw-get-scenarios для фильтрации сценариев.'
aliases: [pwg-ti]
---

Сгенерируй идеальные тесты.

Аргументы команды (r, t, s) передаются в `@.opencode/commands/pw-get-scenarios.md` для получения списка сценариев.

1. @.opencode/skills/check-connectivity/SKILL.md

2. Получи список сценариев через `@.opencode/commands/pw-get-scenarios.md` с переданными аргументами. Если аргументов нет — используй `s=planned`.

3. Для каждого сценария `<r>/<t>` выполни двухфазный процесс:

## Фаза 1 — Базовый тест (для отладки)

4. См. @.opencode/skills/test-base/route-structure.md — корневой роут.

5. Прочитай `app/<r>/spec/<t>.prompt.md` — список комбинаций, `$user`, переменные.

6. Прочитай `app/<r>/spec/<t>.md` — сценарий.

7. Если `app/<r>/locators.yml` не существует — создай.

8. Напиши **один** тест:
   `tests/<r>/ideal/<t>--desktop--<role>--en.spec.ts`
   - `role` — первый из `combinations` в `.prompt.md`
   - Следуй @.opencode/skills/test-base/test-generation-rule.md

9. Обнови `_status.yml` → `base_test_generated`.

10. Сообщи: «Базовый тест для `<r>/<t>` готов: `/pwdt r=<r> t=<t>`».

## Фаза 2 — Остальные комбинации (после отладки)

11. Получи список существующих тестов через `@.opencode/commands/pw-get-tests.md` с `r=<r> t=<t>`.

12. Прочитай `app/<r>/spec/<t>.prompt.md` — все комбинации.

13. Для каждой комбинации (кроме уже отлаженной и существующих):
    ```
    tests/<r>/ideal/<t>--<viewport>--<role>--<lang>.spec.ts
    ```

14. Обнови `_status.yml` → `test_generated`.

15. Сообщи: «Все комбинации для `<r>/<t>` сгенерированы: `/pwdt r=<r> t=<t>`».

Подробная инструкция: @.opencode/skills/test-base/SKILL.md
