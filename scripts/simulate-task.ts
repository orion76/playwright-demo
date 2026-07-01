import { TrackCostApp } from "../opencode-plugins/track-cost"

const SESSION_ID = "sim_" + Date.now()

function makeEvent(type: string, props: Record<string, unknown>) {
  return { type, properties: props }
}

function simulateTask(label: string, baseTime: number) {
  const app = new TrackCostApp()
  const assistantMsgID = `msg_${label}_${baseTime}`

  app.onEvent(makeEvent("session.created", {
    sessionID: SESSION_ID,
    info: { title: `Simulated task: ${label}` },
  }))

  // Step start
  app.onEvent(makeEvent("session.next.step.started", {
    timestamp: baseTime,
    sessionID: SESSION_ID,
    assistantMessageID: assistantMsgID,
    agent: "build",
    model: { id: "claude-sonnet-4", providerID: "anthropic" },
  }))

  // Tool call: read a file
  const call1 = `call_${label}_1`
  app.onEvent(makeEvent("session.next.tool.called", {
    timestamp: baseTime + 500,
    sessionID: SESSION_ID,
    assistantMessageID: assistantMsgID,
    callID: call1,
    tool: "read",
    input: { filePath: "/src/index.ts" },
  }))

  app.onEvent(makeEvent("session.next.tool.success", {
    timestamp: baseTime + 1200,
    sessionID: SESSION_ID,
    assistantMessageID: assistantMsgID,
    callID: call1,
    structured: { truncated: true },
  }))

  // Tool call: grep search
  const call2 = `call_${label}_2`
  app.onEvent(makeEvent("session.next.tool.called", {
    timestamp: baseTime + 2000,
    sessionID: SESSION_ID,
    assistantMessageID: assistantMsgID,
    callID: call2,
    tool: "grep",
    input: { pattern: "onClick", include: "*.tsx" },
  }))

  app.onEvent(makeEvent("session.next.tool.success", {
    timestamp: baseTime + 3500,
    sessionID: SESSION_ID,
    assistantMessageID: assistantMsgID,
    callID: call2,
    structured: { matches: 12 },
  }))

  // Step end
  app.onEvent(makeEvent("session.next.step.ended", {
    timestamp: baseTime + 10000,
    sessionID: SESSION_ID,
    assistantMessageID: assistantMsgID,
    finish: "stop",
    cost: 0.042,
    tokens: {
      input: 850,
      output: 320,
      reasoning: 0,
      cache: { read: 0, write: 0 },
    },
  }))

  console.log(`  Task "${label}" done (10s simulated)`)
}

async function main() {
  console.log("Simulating tasks for track-cost plugin...\n")

  const now = Date.now()

  simulateTask("refactor-button", now)
  console.log("  Waiting 5s...\n")
  await new Promise(r => setTimeout(r, 5000))
  simulateTask("fix-layout", now + 15000)

  console.log("\nDone. Check .opencode-logs/<today>.cost.yaml")
}

main().catch(console.error)
