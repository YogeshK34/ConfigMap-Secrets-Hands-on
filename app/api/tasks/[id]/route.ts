import { NextResponse } from "next/server"

// In a real app, this would be a database connection
// Using the DATABASE_URL from Secret
const tasks = [
  { id: "1", title: "Learn Kubernetes", completed: false, category: "Learning" },
  { id: "2", title: "Set up ConfigMaps", completed: true, category: "DevOps" },
  { id: "3", title: "Implement Secrets", completed: false, category: "DevOps" },
]

// Access environment variables from ConfigMap
const logLevel = process.env.LOG_LEVEL || "info"

function log(message: string, level = "info") {
  if (level === "debug" && logLevel !== "debug") return
  console.log(`[${level.toUpperCase()}] ${message}`)
}

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const task = tasks.find((t) => t.id === params.id)

  if (!task) {
    log(`Task not found: ${params.id}`, "warn")
    return NextResponse.json({ error: "Task not found" }, { status: 404 })
  }

  log(`Fetched task: ${params.id}`, "debug")
  return NextResponse.json(task)
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const body = await request.json()
    const taskIndex = tasks.findIndex((t) => t.id === params.id)

    if (taskIndex === -1) {
      log(`Task not found for update: ${params.id}`, "warn")
      return NextResponse.json({ error: "Task not found" }, { status: 404 })
    }

    tasks[taskIndex] = { ...tasks[taskIndex], ...body }
    log(`Updated task: ${params.id}`, "debug")

    return NextResponse.json(tasks[taskIndex])
  } catch (error) {
    log(`Error updating task: ${error}`, "error")
    return NextResponse.json({ error: "Failed to update task" }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  const taskIndex = tasks.findIndex((t) => t.id === params.id)

  if (taskIndex === -1) {
    log(`Task not found for deletion: ${params.id}`, "warn")
    return NextResponse.json({ error: "Task not found" }, { status: 404 })
  }

  tasks.splice(taskIndex, 1)
  log(`Deleted task: ${params.id}`, "debug")

  return new Response(null, { status: 204 })
}
