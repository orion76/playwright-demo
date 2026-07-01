# Login User — вход с некорректными данными

1. Открыть `/login`

[main.loginForm]
2. **Ожидание:** заголовок "Login to your account" виден
3. Заполнить `emailInput` = `$invalidEmail`
4. Заполнить `passwordInput` = `$wrongPassword`
5. Нажать `loginBtn`
6. **Ожидание:** сообщение об ошибке "Your email or password is incorrect!" видно
