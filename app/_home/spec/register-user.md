# Register User — полная регистрация нового пользователя

1. Открыть `/`

[header.nav]
2. **Ожидание:** `signupLogin` виден
3. Нажать `signupLogin`

[main.signupForm]
4. **Ожидание:** `signupForm` заголовок "New User Signup!" виден
5. Заполнить `nameInput` = `$userName`
6. Заполнить `emailInput` = `$userEmail`
7. Нажать `signupBtn`

[main.accountInfo]
8. **Ожидание:** заголовок "Enter Account Information" виден
9. Выбрать `titleMr`
10. Заполнить `passwordInput` = `$userPassword`
11. Выбрать `daySelect` = `$birthDay`
12. Выбрать `monthSelect` = `$birthMonth`
13. Выбрать `yearSelect` = `$birthYear`
14. Отметить `newsletterCheckbox`
15. Отметить `offersCheckbox`

[main.addressInfo]
16. Заполнить `firstNameInput` = `$firstName`
17. Заполнить `lastNameInput` = `$lastName`
18. Заполнить `addressInput` = `$address`
19. Выбрать `countrySelect` = `$country`
20. Заполнить `stateInput` = `$state`
21. Заполнить `cityInput` = `$city`
22. Заполнить `zipcodeInput` = `$zipcode`
23. Заполнить `mobileInput` = `$mobile`
24. Нажать `createAccountBtn`

[main.success]
25. **Ожидание:** заголовок "Account Created!" виден
26. Нажать `continueBtn`

[header.nav]
27. **Ожидание:** элемент "Logged in as $userName" виден
28. Нажать `deleteAccount`

[/]
29. **Ожидание:** заголовок "Account Deleted!" виден
30. Нажать `continueBtn`
