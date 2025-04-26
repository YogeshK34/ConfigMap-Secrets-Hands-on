import { NextResponse } from "next/server"
import { v4 as uuidv4 } from "uuid"

// In a real app, this would be a database connection
// Using the DATABASE_URL from Secret
const tasks = [
  { id: "1", title: "Learn Kubernetes", completed: false, category: "Learning" },
  { id: "2", title: "Set up ConfigMaps", completed: true, category: "DevOps" },
  { id: "3", title: "Implement Secrets", completed: false, category: "DevOps" },
]

// Access environment variables from ConfigMap
const logLevel = process.env.LOG_LEVEL || "info"
const maxTasks = Number.parseInt(process.env.MAX_TASKS || "100")

// Access environment variables from Secret
const apiKey = process.env.API_KEY || "dummy-api-key"

function log(message: string, level = "info") {
  if (level === "debug" && logLevel !== "debug") return
  console.log(`[${level.toUpperCase()}] ${message}`)
}

export async function GET() {
  log("Fetching all tasks", "debug")
  return NextResponse.json(tasks)
}

export async function POST(request: Request) {
  try {
    const body = await request.json()

    if (!body.title) {
      return NextResponse.json({ error: "Title is required" }, { status: 400 })
    }

    if (tasks.length >= maxTasks) {
      log(`Task limit reached (${maxTasks})`, "warn")
      return NextResponse.json({ error: "Maximum number of tasks reached" }, { status: 400 })
    }

    const newTask = {
      id: uuidv4(),
      title: body.title,
      completed: false,
      category: body.category || "General",
    }

    tasks.push(newTask)
    log(`Created new task: ${newTask.id}`, "debug")

    return NextResponse.json(newTask, { status: 201 })
  } catch (error) {
    log(`Error creating task: ${error}`, "error")
    return NextResponse.json({ error: "Failed to create task" }, { status: 500 })
  }
}
