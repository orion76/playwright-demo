import { readFileSync, existsSync } from "fs"
import { join } from "path"

const LOG_DIR = ".opencode-logs"

function help() {
  console.log(`
Usage:
  npx tsx scripts/replay-events.ts <file>           — replay events & show summary
  npx tsx scripts/replay-events.ts <file> --raw      — dump all events as formatted JSON
  npx tsx scripts/replay-events.ts --list            — list available debug logs

Examples:
  npx tsx scripts/replay-events.ts .opencode-logs/debug-2026-06-18.jsonl
  npx tsx scripts/replay-events.ts .opencode-logs/debug-2026-06-18.jsonl --raw
  npx tsx scripts/replay-events.ts --list
`)
}

function listLogs() {
  const { readdirSync } = require("fs")
  const dir = join(process.cwd(), LOG_DIR)
  if (!existsSync(dir)) {
    console.log("No debug logs found.")
    return
  }
  const files = readdirSync(dir).filter((f: string) => f.startsWith("debug-") && f.endsWith(".jsonl"))
  if (files.length === 0) {
    console.log("No debug logs found.")
    return
  }
  console.log("Available debug logs:")
  for (const f of files) console.log(`  ${join(dir, f)}`)
}

interface Event {
  type: string
  properties: Record<string, unknown>
}

function loadEvents(filePath: string): Event[] {
  const abs = filePath.startsWith("/") ? filePath : join(process.cwd(), filePath)
  if (!existsSync(abs)) {
    console.error(`File not found: ${abs}`)
    process.exit(1)
  }
  const lines = readFileSync(abs, "utf-8").trim().split("\n").filter(Boolean)
  return lines.map((line, i) => {
    try {
      return JSON.parse(line) as Event
    } catch {
      console.error(`Invalid JSON at line ${i + 1}: ${line.slice(0, 80)}`)
      process.exit(1)
    }
  })
}

function showRaw(events: Event[]) {
  for (const e of events) {
    console.log(JSON.stringify(e, null, 2))
    console.log("---")
  }
}

function showSummary(events: Event[]) {
  const byType = new Map<string, number>()
  const propFields = new Map<string, Set<string>>()

  for (const e of events) {
    byType.set(e.type, (byType.get(e.type) ?? 0) + 1)
    const fields = propFields.get(e.type) ?? new Set()
    for (const k of Object.keys(e.properties)) fields.add(k)
    propFields.set(e.type, fields)
  }

  console.log(`Total events: ${events.length}`)
  console.log("")
  console.log("By type:")
  const sorted = [...byType.entries()].sort((a, b) => b[1] - a[1])
  for (const [type, count] of sorted) {
    const fields = [...(propFields.get(type) ?? [])].join(", ")
    console.log(`  ${count.toString().padStart(4)}x  ${type}`)
    console.log(`          fields: ${fields}`)
  }
}

async function main() {
  const args = process.argv.slice(2)

  if (args.length === 0 || args[0] === "--help") {
    help()
    return
  }

  if (args[0] === "--list") {
    listLogs()
    return
  }

  const filePath = args[0]
  const events = loadEvents(filePath)

  if (args.includes("--raw")) {
    showRaw(events)
    return
  }

  showSummary(events)
}

main().catch(console.error)
