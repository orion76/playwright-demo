---
description: 'Генерация сценариев идеального поведения. Аргументы передаются в pw-get-scenarios для фильтрации.'
aliases: [pwg-pi]
---

Сгенерируй сценарии.

Аргументы команды (r, t, s) передаются в `@.opencode/commands/pw-get-scenarios.md` для получения списка сценариев. Если аргументов нет — по умолчанию все planned-сценарии.

1. Получи список сценариев через `@.opencode/commands/pw-get-scenarios.md` с переданными аргументами. Если аргументов нет — используй `s=planned`.

2. Для каждого сценария из списка:
   - Извлеки `<r>` (роут) и `<t>` (имя сценария) из строки `<route>/<scenario>`

3. Прочитай `app/<r>/_status.yml`. Если статус не `planned` — пропусти (уже готов).

4. Найди `.prompt.md`-файл: `app/<r>/spec/<t>.prompt.md`

5. Прочитай `app/<r>/_prompt.md` и `app/<r>/structure.yaml`.

6. Следуй процессу из @.opencode/skills/write-scenario/SKILL.md и сгенерируй `app/<r>/spec/<t>.md`.

7. Обнови `_status.yml`: установи статус `scenario_written` для сценария.

8. Сообщи пользователю что создан `app/<r>/spec/<t>.md`.
