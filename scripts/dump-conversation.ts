import Database from "better-sqlite3"
import { join } from "path"
import { homedir } from "os"

const DB_PATH = join(homedir(), ".local/share/opencode/opencode.db")

/**
 * Usage: npx tsx scripts/dump-conversation.ts [count]
 *   count — number of last messages to show (default: 3)
 */
function main() {
  const count = Math.max(1, parseInt(process.argv[2] || "3", 10) || 3)

  const db = new Database(DB_PATH, { readonly: true })

  const projectDir = process.cwd()
  const session = db
    .prepare(
      `SELECT id, title FROM session
       WHERE path = ? OR directory = ?
       ORDER BY time_updated DESC LIMIT 1`,
    )
    .get(projectDir, projectDir) as { id: string; title: string } | undefined

  if (!session) {
    console.error("No session found for", projectDir)
    process.exit(1)
  }

  const rows = db
    .prepare(
      `SELECT m.id, json_extract(m.data, '$.role') as role,
              json_extract(p.data, '$.text') as text
       FROM message m
       JOIN part p ON p.message_id = m.id
       WHERE m.session_id = ?
         AND json_extract(m.data, '$.role') IN ('user', 'assistant')
         AND json_extract(p.data, '$.type') = 'text'
       ORDER BY m.time_created, p.time_created`,
    )
    .all(session.id) as { id: string; role: string; text: string | null }[]

  db.close()

  if (!rows.length) {
    console.log("No messages in this session.")
    process.exit(0)
  }

  // Group consecutive same-role rows into messages
  const messages: { role: string; texts: string[] }[] = []
  for (const row of rows) {
    if (!row.text) continue
    if (!messages.length || messages[messages.length - 1].role !== row.role) {
      messages.push({ role: row.role, texts: [] })
    }
    messages[messages.length - 1].texts.push(row.text)
  }

  const slice = messages.slice(-count)

  console.log(`# ${session.title}\n`)

  for (const msg of slice) {
    const prefix = msg.role === "user" ? "## You" : "## Assistant"
    console.log(`${prefix}\n`)
    for (const t of msg.texts) {
      if (t.trim()) console.log(t)
    }
    console.log()
  }
}

main()
