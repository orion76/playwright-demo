import { test } from "@playwright/test";
import { testLoginIncorrect } from "./shared/login-incorrect";

test("SPEC: test", async ({ page }) => {
  await testLoginIncorrect(page, { viewport: "mobile", role: "guest", lang: "en" });
});
