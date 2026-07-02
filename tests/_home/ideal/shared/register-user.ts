import { Page, expect } from "@playwright/test";
import { initPage } from "@src/pages/init";
import { createAccount, deleteAccount } from "@src/api/accounts";
import type { UViewport } from "@src/types";

export interface ScenarioOpts {
  viewport: UViewport;
  role: string;
  lang: string;
}

const TS = Date.now();
const USER_NAME = `PW_User_${TS}`;
const USER_EMAIL = `pw_${TS}@test.com`;
const USER_PASS = "TestPass123!";

export async function testRegisterUser(page: Page, opts: ScenarioOpts) {
  const r = await createAccount({
    name: USER_NAME,
    email: USER_EMAIL,
    password: USER_PASS,
    title: "Mr",
    birth_date: "1",
    birth_month: "January",
    birth_year: "1990",
    firstname: "Test",
    lastname: "User",
    address1: "123 Test Street",
    country: "United States",
    state: "California",
    city: "Los Angeles",
    zipcode: "90001",
    mobile_number: "1234567890",
  });
  expect(r.responseCode).toBe(201);

  const po = initPage(page, "login", opts.viewport);
  await po.navigate();
  await expect(po.region("main").block("loginForm").element("title")).toBeVisible();

  const form = po.region("main").block("loginForm");
  await form.element("emailInput").fill(USER_EMAIL);
  await form.element("passwordInput").fill(USER_PASS);
  await form.element("loginBtn").click();
  await page.waitForURL("**/");

  await expect(page.getByText(USER_NAME)).toBeVisible();

  const d = await deleteAccount(USER_EMAIL, USER_PASS);
  expect(d.responseCode).toBe(200);
}
