# Test Code Rules

Правила генерации кода тестов — проверки, что UI-взаимодействия действительно сработали.

## Language

Test names (`test("...")`) and comments (`// ...`) must be in **English** only. No Russian, no Hebrew.

```ts
// ✅ good
test("SPEC: event/create — Happy path — full event creation", ...);

// ❌ bad
test("SPEC: event/create — Happy path — полное создание ивента", ...);
```

## Console messages

Browser console errors and warnings are saved automatically by the trace fixture
to `<test-dir>/trace/<name>.console.log`.

When analyzing test results, always check the console log. If the app produces
unexpected errors or warnings (TinyMCE license, deprecated APIs, 404, CORS, etc.) —
file them as issues in `app/<route>/issues.yaml` (local) or `issues/todo.yml` (global).

## Следование сценарию

Тест генерируется **строго по сценарию** из `app/<route>/plans/*.md`. Каждый шаг сценария — шаг в тесте.

- Не добавлять логику, которой нет в сценарии
- Не пропускать шаги, которые есть в сценарии
- Не заменять ожидаемое поведение на известное реальное — сначала выполнить сценарий как написано, потом зафиксировать расхождение

## Расхождение с реальностью

Если в процессе прогона теста обнаружилось, что сценарий не соответствует приложению:

1. **Сценарий ошибочен** (например, ожидался тост на Next, а валидация на сабмите) — исправь план в `app/<route>/plans/*.md` под реальное поведение
2. **Приложение сломалось** (белый экран, console.error, невалидные данные ушли на бэкенд) — заведи issue
3. **Непредусмотренное поведение** (не ошибка, но странно) — сообщи пользователю

## Синхронизация теста и сценария

Если в процессе отладки тест был доработан не по сценарию — обнови сценарий в `app/<route>/plans/*.md` чтобы он соответствовал тесту.

Тест и сценарий — всегда консистентны.

## Валидация полей ввода

При работе с формой проверять для каждого поля:

1. **Доступность кнопки сабмита** — невалидное поле → кнопка disabled, валидное → enabled
2. **Визуальная валидация** — после потери фокуса (blur) невалидное поле подсвечивается красной рамкой; для валидного поля рамка отсутствует
3. **Тосты с ошибками** — проверять наличие тоста с сообщением, связанным с полем (например «обязательное поле», «номер слишком короткий»)

## После fill — проверь значение

После заполнения поля всегда проверяй, что значение применилось:

```ts
const input = generalInfo.element("eventName");
await input.fill("PLAYWRIGHT-TEST-12345");
await expect(input).toHaveValue("PLAYWRIGHT-TEST-12345");
```

Исключение: если поле перерисовывается после ввода (react-select, datepicker, rich-text) — проверяй через видимость результата:

```ts
// react-select: проверить что выбранный вариант отображается
await expect(page.getByText("Tel Aviv")).toBeVisible();

// datepicker: проверить что дата отображается в поле
await expect(generalInfo.element("startDate")).toContainText("15");
```

## После клика по чекбоксу/ toggle — проверь состояние

```ts
const checkbox = selectingOptions.element("privateEvent");
const initial = await checkbox.isChecked();
await checkbox.click();
await expect(checkbox).toBeChecked({ checked: !initial });
```

Особенно важно, если чекбокс раскрывает дополнительные поля (showEventInfo → Sex, Age restriction).

## После клика по кнопке — проверь переход

```ts
await generalInfo.element("next").click();
// Дождись появления следующего шага
await expect(main.block("organizerProfile").element("next")).toBeVisible({ timeout: 5000 });
```

Не используй `page.waitForTimeout()` без крайней необходимости.

## После загрузки файла — проверь индикатор

```ts
const upload = new FileUploadControl(page, photosAndVideos.element("addContent"), "en");
await upload.setValue(".temp/test-image.png");
await expect(page.getByText("File uploaded successfully")).toBeVisible({ timeout: 10000 });
```

## После сабмита — проверь тост успеха или редирект

```ts
await main.block("createPromocode").element("createEvent").click();
// Тост успеха
await expect(page.getByText("Event created successfully")).toBeVisible({ timeout: 10000 });
// ИЛИ редирект
await page.waitForURL("**/event/*");
```

## Новые локаторы в процессе разработки

Если в процессе написания или отладки теста обнаружились элементы, которых нет в `structure.yaml`, `locators.yml` или `locales.yaml` — **добавь их во все три файла** роута:

- `app/<route>/structure.yaml` — структура блока/поля
- `app/<route>/locators.yml` — Playwright-локатор
- `app/<route>/locales.yaml` — перевод EN/HE

Локаторы всегда должны быть описаны в данных роута, не используй прямые селекторы в тесте.

## Исключения (когда можно не проверять)

- Проверка "нет падения" (crash-тест) — не требует assert на каждый клик
- Поле опциональное и не влияет на дальнейшие шаги
- Порядок важен: assert после submit может заменить assert на каждом шаге
