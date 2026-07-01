import { Locator, Page } from "@playwright/test";

export interface DropdownEntry {
  triggerText: string;
  links: { text: string; href: string | null }[];
}

/**
 * Click any element (button/link/div), wait, collect all links on page,
 * then close with Escape. Returns links that appeared after the click
 * compared to a previous snapshot.
 */
export async function expandAndCollect(
  page: Page,
  target: Locator,
  label: string,
  knownLinksCount: number
): Promise<DropdownEntry | null> {
  const isVisible = await target.isVisible().catch(() => false);
  if (!isVisible) return null;

  await target.click();
  await page.waitForTimeout(400);

  const allLinks = await page.getByRole("link").all();
  const links: { text: string; href: string | null }[] = [];
  for (const link of allLinks) {
    const text = (await link.textContent())?.trim();
    const href = await link.getAttribute("href");
    if (text && !links.some((l) => l.text === text)) {
      links.push({ text, href });
    }
  }

  const newLinks = links.slice(knownLinksCount);
  if (newLinks.length === 0) return null;

  await page.keyboard.press("Escape");
  await page.waitForTimeout(200);

  return { triggerText: label, links: newLinks };
}

export async function expandAllDropdowns(page: Page): Promise<DropdownEntry[]> {
  const entries: DropdownEntry[] = [];

  const triggers = page.locator(
    '[class*="dropdown"]:not([class*="dropdown"] *), ' +
    '[class*="menu-trigger"], ' +
    '[class*="select"]:not([class*="select"] *), ' +
    '[role="combobox"], ' +
    '[aria-haspopup]'
  );

  const count = await triggers.count();
  for (let i = 0; i < count; i++) {
    try {
      const trigger = triggers.nth(i);
      const text = (await trigger.textContent())?.trim() || "";
      const isVisible = await trigger.isVisible();
      if (!isVisible || !text) continue;

      const knownCount = entries.reduce((s, e) => s + e.links.length, 0);
      const entry = await expandAndCollect(page, trigger, text, knownCount);
      if (entry) entries.push(entry);
    } catch {
      // skip failed triggers
    }
  }

  return entries;
}

/**
 * Generic expander: find an element by text or role, click it, collect new links.
 * Useful for user menu, filter dropdowns, etc.
 */
export async function expandMenuByText(
  page: Page,
  textOrPattern: string | RegExp,
  knownLinksCount: number
): Promise<DropdownEntry | null> {
  const target = page.getByText(textOrPattern, { exact: false }).first();
  const exists = await target.count();
  if (!exists) return null;

  const label = typeof textOrPattern === "string" ? textOrPattern : textOrPattern.source;
  return expandAndCollect(page, target, label, knownLinksCount);
}

export async function expandMenuByRole(
  page: Page,
  role: "button" | "link" | "menuitem" | "combobox",
  name: string | RegExp,
  knownLinksCount: number
): Promise<DropdownEntry | null> {
  const target = page.getByRole(role, { name: name }).first();
  const exists = await target.count();
  if (!exists) return null;

  return expandAndCollect(page, target, name.toString(), knownLinksCount);
}
