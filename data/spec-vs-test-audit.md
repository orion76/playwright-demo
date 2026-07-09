# Аудит соответствия spec-файлов и тестов

**Дата**: 2026-07-02
**Всего spec-файлов**: 27 (без учёта `app/test_cases/spec/` — там 26 spec'ов без тестов)

---

## Полностью соответствуют (4 / 27)

| Route | Сценарий | Статус |
|---|---|---|
| `_home` | `logout-user` | ✅ |
| `login` | `login-correct` | ✅ |
| `login` | `login-incorrect` | ✅ |
| `login` | `login-existing-email` | ✅ |

---

## Не соответствуют (23 / 27)

### `_home`

| Сценарий | Статус | Проблема |
|---|---|---|
| `register-user` | ❌ | 5 шагов пропущено: проверка `signupLogin` (шаг 2), проверка "New User Signup!" (шаг 4), проверка "Enter Account Information" (шаг 8), чекбокс newsletter (шаг 14), чекбокс offers (шаг 15). 1 лишний шаг: проверка hero title |
| `subscription` | ❌ | Нет проверки success-сообщения "You have been successfully subscribed!" (шаг 5) |
| `test-cases-navigation` | ❌ | Нет проверки видимости `testCases` перед кликом (шаг 2) |
| `view-category-products` | ❌ | 7 из 9 шагов отсутствуют: клики по категориям Women/Dress/Men, проверки URL и заголовков категорий |
| `recommended-items` | ❌ | Нет проверки заголовка "RECOMMENDED ITEMS" (шаг 3) |
| `scroll-up-arrow` | ❌ | Нет проверки текста "Full-Fledged practice website for Automation Engineers" после скролла (шаг 5) |
| `scroll-up-without-arrow` | ❌ | Нет проверки текста "Full-Fledged practice website for Automation Engineers" после скролла (шаг 5) |

### `login`

| Сценарий | Статус | Проблема |
|---|---|---|
| `place-order-login-before-checkout` | ❌ | Заглушка: реализовано 2 из 6 шагов (только навигация + заголовок) |
| `place-order-register-before-checkout` | ❌ | Заглушка: реализовано 2 из 6 шагов (только навигация + заголовок) |
| `verify-address-details-checkout` | ❌ | Заглушка: реализовано 2 из 6 шагов (только навигация + заголовок) |

### `products`

| Сценарий | Статус | Проблема |
|---|---|---|
| `verify-all-products` | ❌ | Нет проверки видимости списка продуктов (шаг 6) и блока деталей (шаг 9) |
| `search-product` | ❌ | Нет проверки "SEARCHED PRODUCTS" (шаг 7) и видимости результатов (шаг 8) |
| `add-products-in-cart` | ❌ | Нет hover (клик вместо hover), нет проверки товаров в корзине (шаг 9) |
| `view-brand-products` | ❌ | Нет клика по второму бренду (шаги 5-6), нет проверки видимости продуктов |
| `search-products-verify-cart-after-login` | ❌ | Заглушка: реализовано 2 из 9 шагов |
| `place-order-register-while-checkout` | ❌ | Заглушка: реализовано 2 из 9 шагов |
| `download-invoice-after-purchase` | ❌ | Заглушка: реализовано 2 из 9 шагов |

### `product_details`

| Сценарий | Статус | Проблема |
|---|---|---|
| `verify-product-detail` | ❌ | Нет проверки `price` (шаг 4) |
| `verify-product-quantity` | ❌ | Нет проверки quantity=4 в корзине (шаг 7) |
| `add-review` | ❌ | Нет проверки "Write Your Review" перед заполнением (шаг 2) |

### `view_cart`

| Сценарий | Статус | Проблема |
|---|---|---|
| `remove-product` | ❌ | Заглушка: реализован 1 из 4 шагов (только навигация) |
| `subscription-in-cart` | ❌ | Заглушка: реализован 1 из 5 шагов (только навигация) |

### `contact_us`

| Сценарий | Статус | Проблема |
|---|---|---|
| `contact-us-form` | ❌ | Нет upload файла (шаг 7), нет проверки "Get In Touch" (шаг 2), нет проверки диалога (шаг 9), нет проверки success (шаг 10) |

---

## Дополнительно: spec-файлы без тестов

В `app/test_cases/spec/` находятся 26 spec-файлов, для которых нет ни одного теста:

1. `01-register-user.md`
2. `02-login-user-with-correct-email-and-password.md`
3. `03-login-user-with-incorrect-email-and-password.md`
4. `04-logout-user.md`
5. `05-register-user-with-existing-email.md`
6. `06-contact-us-form.md`
7. `07-verify-test-cases-page.md`
8. `08-verify-all-products-and-product-detail-page.md`
9. `09-search-product.md`
10. `10-verify-subscription-in-home-page.md`
11. `11-verify-subscription-in-cart-page.md`
12. `12-add-products-in-cart.md`
13. `13-verify-product-quantity-in-cart.md`
14. `14-place-order-register-while-checkout.md`
15. `15-place-order-register-before-checkout.md`
16. `16-place-order-login-before-checkout.md`
17. `17-remove-products-from-cart.md`
18. `18-view-category-products.md`
19. `19-view-&-cart-brand-products.md`
20. `20-search-products-and-verify-cart-after-login.md`
21. `21-add-review-on-product.md`
22. `22-add-to-cart-from-recommended-items.md`
23. `23-verify-address-details-in-checkout-page.md`
24. `24-download-invoice-after-purchase-order.md`
25. `25-verify-scroll-up-using-arrow-button-and-scroll-down-functionality.md`
26. `26-verify-scroll-up-without-arrow-button-and-scroll-down-functionality.md`

---

## Статистика

- **Всего spec-файлов с тестами**: 27
- **Полностью соответствуют**: 4 (15%)
- **Не соответствуют**: 23 (85%)
- **Из них — заглушки** (только навигация): 8
- **Spec-файлов без тестов**: 26
