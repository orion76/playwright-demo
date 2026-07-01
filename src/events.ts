import { readFileSync } from "fs";
import { load } from "js-yaml";
import { join } from "path";
import { getProjectRoot } from "./utils";

export interface TestEvent {
  title: string;
  id: string;
}

interface TestEvents {
  test_events: TestEvent[];
}

export function readTestEvents(): TestEvent[] {
  const file = join(getProjectRoot(), "app", "config.yml");
  const doc = load(readFileSync(file, "utf-8")) as TestEvents;
  return doc.test_events ?? [];
}

export function getTestEvent(title: string): TestEvent {
  const events = readTestEvents();
  const event = events.find((e) => e.title === title);
  if (!event) throw new Error(`Test event "${title}" not found in app/config.yml`);
  return event;
}
