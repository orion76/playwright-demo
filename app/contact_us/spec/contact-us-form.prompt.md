---
combinations:
  - viewport: desktop
    role: guest
    lang: en
  - viewport: desktop
    role: registered
    lang: en
  - viewport: mobile
    role: guest
    lang: en
  - viewport: tablet
    role: guest
    lang: en
---

## Test Case 6: Contact Us Form

1. Launch browser
2. Navigate to url 'http://automationexercise.com'
3. Verify that home page is visible successfully
4. Click on 'Contact Us' button
5. Verify 'GET IN TOUCH' is visible
6. Enter name, email, subject and message
7. Upload file
8. Click 'Submit' button
9. Click OK button
10. Verify success message 'Success! Your details have been submitted successfully.' is visible
11. Click 'Home' button and verify that landed to home page successfully

$userName: "TestUser"
$userEmail: "test@example.com"
$subject: "Test Subject"
$message: "This is a test message for the contact form."
