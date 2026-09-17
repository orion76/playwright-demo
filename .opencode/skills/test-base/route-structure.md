# Route Structure

Роут страницы совпадает с путём к папке в `app/` и `tests/`:

```
app/
  _home/             → / (корневой роут)
    structure.yaml
    locales.yaml
    ...
  login/             → /login
    structure.yaml
    locales.yaml
    spec/
      successful-login.md
      invalid-phone.md

tests/
  _home/
    ideal/
    plans/
  login/
    ideal/
    plans/
```

Каждый роут — независимая папка со своей структурой.
TestService.open("profile/tickets") загружает `app/profile/tickets/locators.yml`.

Корневой роут (`/`) лежит в папке `app/_home/` / `tests/_home/`.
В коде и командах корневой роут указывается как `"/"` (не `"_home"`, не `"home"`).
Маппинг роута на папку — в `app/config.yml` → `route_folders`.

## Состав папки `app/<route>/`

| Файл | Описание |
|------|----------|
| `_prompt.md` | ID и описания всех сценариев роута |
| `_status.yml` | Статус каждого сценария |
| `structure.yaml` | Регионы, блоки, локаторы |
| `network.yaml` | Сетевые запросы |
| `issues.yaml` | Известные проблемы |
| `locales.yaml` | Переводы (по языкам из `app/config.yml` → `languages`) |
| `spec/*.md` | Отдельные файлы сценариев (по одному на сценарий) |
| `spec/*.prompt.md` | Конфиг сценария: $user, переменные |
| `constraints.yaml` | Правила защиты бэкенда |
| `plans/*.md` | Как сломать это поведение |

## Статусы сценариев (`_status.yml`)

Статус отражает **последний завершённый этап**:

| Статус | Что готово |
|--------|------------|
| `planned` | Только запись в `_prompt.md` |
| `data_collected` | Собран `structure.yaml`, `locales.yaml`, `network.yaml` |
| `scenario_written` | Написан `spec/<id>.md` |
| `base_test_generated` | Сгенерирован базовый тест (desktop, EN, первый role) |
| `base_test_debugged` | Базовый тест отлажен и проходит |
| `test_generated` | Сгенерированы тесты для всех комбинаций |
| `completed` | Все тесты отлажены и проходят |

## Viewport и язык по умолчанию

Все тесты по умолчанию запускаются на viewport из `app/config.yml` → `viewports`, и на языках из `app/config.yml` → `languages`.
Базовый тест — `desktop`, `DEFAULT_LANGUAGE`. После его отладки генерируются остальные комбинации.

## Отладка упавших тестов

При падении теста:
1. Остановить выполнение остальных тестов
2. Добавить `test.only` к упавшему — запускаться будет только он
3. Исправить причину падения
4. Убрать `test.only`
5. Запустить весь файл целиком — убедиться что все тесты проходят

## Именование сценариев и тестов

Для каждого теста есть базовое имя `[name]`.

### Файлы сценариев (`app/<route>/spec/`)

| Файл | Описание |
|------|----------|
| `[name].page-structure.md` | Сценарий проверки наличия элементов на странице |
| `[name].ideal.md` | Сценарий идеального поведения пользователя |
| `[name].bad-input.md` | Сценарий проверки валидации / неправильного ввода |
| `[name]--[modifier].md` | Если сценарий объёмный — разбивается на части с модификатором |

### Файлы тестов (`tests/<route>/`)

| Файл | Описание |
|------|----------|
| `[name].page-structure.spec.ts` | Проверка элементов на странице |
| `[name].ideal.spec.ts` | Идеальное поведение пользователя |
| `[name].bad-input.spec.ts` | Валидация / неправильный ввод |
| `[name]--[modifier].spec.ts` | Если тест объёмный — разбивается с модификатором |
| `[name].data.ts` | Тестовые данные (константы для форм и т.п.) |

Пример для `/login`:

```
app/login/
  spec/
    login.page-structure.md
    login.ideal.md
    login.bad-input.md
  locators.yml
  locales.yaml

tests/login/
  login.page-structure.spec.ts
  login.ideal.spec.ts
  login.bad-input.spec.ts
  login.data.ts
```

### Краш-тесты (plans)

```
app/<route>/
  plans/
    [plan-name].md

tests/<route>/
  plans/
    [plan-name].spec.ts
```

- Краш-тесты в `tests/<route>/plans/`, по одному файлу на план
