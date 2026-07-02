# Search Products and Verify Cart After Login — поиск и проверка корзины после логина

1. Открыть `/products`

[main.search]
2. Заполнить `searchInput` = `$productName`
3. Нажать `searchBtn`
4. **Ожидание:** заголовок "SEARCHED PRODUCTS" виден
5. **Ожидание:** найденные товары видны
6. Добавить найденные товары в корзину
7. Нажать "Cart"

[main.cartContent]
8. **Ожидание:** товары видны в корзине
9. Нажать `checkoutBtn`
10. **Ожидание:** редирект на `/login` или модальное окно
