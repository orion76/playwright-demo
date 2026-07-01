# Register User with existing email — регистрация с уже занятым email

1. Открыть `/login`

[main.signupForm]
2. **Ожидание:** заголовок "New User Signup!" виден
3. Заполнить `nameInput` = `$userName`
4. Заполнить `emailInput` = `$existingEmail`
5. Нажать `signupBtn`
6. **Ожидание:** сообщение об ошибке "Email Address already exist!" видно
