import { Page, expect } from "@playwright/test";
import { initPage } from "@src/pages/init";
import type { UViewport } from "@src/types";

export interface ScenarioOpts {
  viewport: UViewport;
  role: string;
  lang: string;
}

export async function testContactForm(page: Page, opts: ScenarioOpts) {
  const po = initPage(page, "contact_us", opts.viewport);
  await po.navigate();

  const form = po.region("main").block("contactForm");
  await form.element("nameInput").fill("TestUser");
  await form.element("emailInput").fill("test@example.com");
  await form.element("subjectInput").fill("Test Subject");
  await form.element("messageInput").fill("This is a test message.");

  page.on("dialog", (d) => d.accept());
  await form.element("submitBtn").click();
}
