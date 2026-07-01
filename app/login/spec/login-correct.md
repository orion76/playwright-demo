# Login User — вход с корректными данными

1. Открыть `/login`

[main.loginForm]
2. **Ожидание:** заголовок "Login to your account" виден
3. Заполнить `emailInput` = `$userEmail`
4. Заполнить `passwordInput` = `$userPassword`
5. Нажать `loginBtn`
6. **Ожидание:** редирект на `/`
7. **Ожидание:** текст "Logged in as $userName" виден
