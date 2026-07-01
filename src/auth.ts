import { Page } from "@playwright/test";
import { readFileSync } from "fs";
import { load } from "js-yaml";
import { join } from "path";
import { TestService } from "@src/services";
import { getProjectRoot } from "@src/utils";

interface TestUser {
  phone?: string;
  email?: string;
  password?: string;
  description?: string;
  auth_type?: string;
  roles?: string[];
  cookie_file?: string;
}

interface TestUsers {
  test_users: Record<string, TestUser>;
}

export function readTestUsers(): TestUsers["test_users"] {
  const file = join(getProjectRoot(), "app", "config.yml");
  const doc = load(readFileSync(file, "utf-8")) as TestUsers;
  return doc.test_users;
}

export function getEmail(userKey: string): string {
  const users = readTestUsers();
  const user = users[userKey];
  if (!user) throw new Error(`User "${userKey}" not found in app/config.yml`);
  if (!user.email) throw new Error(`User "${userKey}" has no email in app/config.yml`);
  return user.email;
}

export function getPassword(userKey: string): string {
  const users = readTestUsers();
  const user = users[userKey];
  if (!user) throw new Error(`User "${userKey}" not found in app/config.yml`);
  if (!user.password) throw new Error(`User "${userKey}" has no password in app/config.yml`);
  return user.password;
}

export function getPhone(userKey = "default"): string {
  const users = readTestUsers();
  if (!users[userKey]) throw new Error(`User "${userKey}" not found in app/config.yml`);
  return users[userKey].phone;
}

export function getStorageState(userKey: string): string {
  const users = readTestUsers();
  const user = users[userKey];
  if (!user) throw new Error(`User "${userKey}" not found in app/config.yml`);

  if (user.cookie_file) return user.cookie_file;
  return `auth/${userKey}.json`;
}

export async function loginByCredentials(page: Page, userKey: string): Promise<void> {
  const email = getEmail(userKey);
  const password = getPassword(userKey);
  await page.goto("https://automationexercise.com/login", { waitUntil: "load" });
  await page.locator("input[data-qa='login-email']").fill(email);
  await page.locator("input[data-qa='login-password']").fill(password);
  await page.locator("button[data-qa='login-button']").click();
  await page.waitForURL("**/", { timeout: 10000 });
}

export async function loginByPhone(page: Page, phone?: string): Promise<void> {
  const p = phone ?? getPhone();

  const app = await new TestService(page, "en", "desktop").open("login");
  const main = app.region("main");

  // Step 1: Enter phone number
  await main.block("phoneForm").element("phoneInput").fill(p);
  await main.block("phoneForm").element("continueBtn").click();

  // Step 2: Wait for OTP form
  await page.waitForURL("**/login**", { timeout: 5000 }).catch(() => {});
  await page.waitForTimeout(500);

  throw new Error("loginByPhone is not implemented for this project");

  // Step 3: Enter OTP
  const otpInputs = page.locator('input[autocomplete="one-time-code"]');
  const otpCount = await otpInputs.count();

  if (otpCount > 0) {
    const digits = code.split("");
    for (let i = 0; i < Math.min(digits.length, otpCount); i++) {
      await otpInputs.nth(i).fill(digits[i]);
    }
  } else {
    await main.block("otpForm").element("otpInput").fill(code);
  }

  // Step 4: Confirm
  const confirm = main.block("otpForm").element("confirmBtn");
  if (await confirm.isVisible().catch(() => false)) {
    await confirm.click();
  }

  // Wait for redirect to home
  await page.waitForURL("**/", { timeout: 10000 }).catch(() => {});
}
