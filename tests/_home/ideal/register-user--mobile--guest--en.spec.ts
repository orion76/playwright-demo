import { test } from "@playwright/test";
import { testRegisterUser } from "./shared/register-user";

test("SPEC: test", async ({ page }) => {
  await testRegisterUser(page, { viewport: "mobile", role: "guest", lang: "en" });
});
