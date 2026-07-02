import { Page, expect } from "@playwright/test";
import { initPage } from "@src/pages/init";
import type { UViewport } from "@src/types";

export interface ScenarioOpts {
  viewport: UViewport;
  role: string;
  lang: string;
}

const dateSuffix = Date.now();

export async function testRegisterUser(page: Page, opts: ScenarioOpts) {
  const home = initPage(page, "/", opts.viewport);
  await home.navigate();
  await expect(home.region("main").block("hero").element("title")).toBeVisible();

  await home.region("header").block("nav").element("signupLogin").click();
  await page.waitForURL("**/login");

  const login = initPage(page, "login", opts.viewport);
  const signup = login.region("main").block("signupForm");
  const userName = "PW_User_" + dateSuffix;
  await signup.element("nameInput").fill(userName);
  await signup.element("emailInput").fill(`pw_${dateSuffix}@test.com`);
  await signup.element("signupBtn").click();
  await page.waitForURL("**/signup");

  const info = initPage(page, "signup", opts.viewport).region("main").block("accountInfo");
  await info.element("titleMr").check();
  await info.element("passwordInput").fill("TestPass123!");
  await info.element("daySelect").selectOption("1");
  await info.element("monthSelect").selectOption("January");
  await info.element("yearSelect").selectOption("1990");

  const addr = initPage(page, "signup", opts.viewport).region("main").block("addressInfo");
  await addr.element("firstNameInput").fill("TestFirst");
  await addr.element("lastNameInput").fill("TestLast");
  await addr.element("addressInput").fill("123 Test Street");
  await addr.element("countrySelect").selectOption("United States");
  await addr.element("stateInput").fill("California");
  await addr.element("cityInput").fill("Los Angeles");
  await addr.element("zipcodeInput").fill("90001");
  await addr.element("mobileInput").fill("1234567890");
  await addr.element("createAccountBtn").click();
  await page.waitForURL("**/account_created");

  const created = initPage(page, "account_created", opts.viewport);
  await expect(created.region("main").block("success").element("title")).toBeVisible();
  await created.region("main").block("success").element("continueBtn").click();
  await page.waitForURL("**/");

  await expect(page.getByText(userName)).toBeVisible();
  await home.region("header").block("nav").element("deleteAccount").click();
  await page.waitForURL("**/delete_account");

  const deleted = initPage(page, "delete_account", opts.viewport);
  await expect(deleted.region("main").block("success").element("title")).toBeVisible();
  await deleted.region("main").block("success").element("continueBtn").click();
}
