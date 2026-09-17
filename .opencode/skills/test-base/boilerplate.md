# Boilerplate: POM-шаблон

```ts
import { test, expect } from "@playwright/test";
import { SITE_URL, HAR_PATH, DEFAULT_LANGUAGE } from "../src/config";
import { TestService } from "../src/services/test.service";

const DEFAULT_VIEWPORT = "desktop" as const;

test.use({ serviceWorkers: "block" });

test("название", async ({ page }) => {
  const app = await new TestService(page, DEFAULT_LANGUAGE, DEFAULT_VIEWPORT).open("_home");
  const main = app.region("main");

  // Локаторы через цепочку: region → block → element (возвращает Locator)
  await main.block("signupForm").element("signupBtn").click();
  await expect(main.block("hero").element("title")).toBeVisible();
});

// Альтернатива — прямой POM без TestService:
// import { initPage } from "../src/pages/init";
// const po = initPage(page, "_home", "desktop");
// await po.navigate();
```
