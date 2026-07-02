# Verify Product quantity in Cart — проверка количества товара в корзине

1. Открыть `/product_details/1`

[main.productInfo]
2. **Ожидание:** `productName` виден
3. Увеличить количество до 4
4. Нажать `addToCartBtn`
5. Нажать "View Cart"
6. **Ожидание:** URL `/view_cart`
7. **Ожидание:** товар отображается с количеством 4
