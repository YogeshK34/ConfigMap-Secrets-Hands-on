"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { PlusCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { TaskList } from "@/components/task-list"
import type { Task } from "@/types/task"

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [newTask, setNewTask] = useState("")
  const [loading, setLoading] = useState(true)

  // App name from ConfigMap (public env var)
  const appName = process.env.NEXT_PUBLIC_APP_NAME || "Task Manager"

  // Feature flag from ConfigMap (public env var)
  const enableTaskCategories = process.env.NEXT_PUBLIC_ENABLE_CATEGORIES === "true"

  useEffect(() => {
    // Fetch tasks from API
    const fetchTasks = async () => {
      try {
        setLoading(true)
        const response = await fetch("/api/tasks")
        const data = await response.json()
        setTasks(data)
      } catch (error) {
        console.error("Failed to fetch tasks:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchTasks()
  }, [])

  const addTask = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newTask.trim()) return

    try {
      const response = await fetch("/api/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title: newTask }),
      })

      const createdTask = await response.json()
      setTasks([...tasks, createdTask])
      setNewTask("")
    } catch (error) {
      console.error("Failed to add task:", error)
    }
  }

  const deleteTask = async (id: string) => {
    try {
      await fetch(`/api/tasks/${id}`, {
        method: "DELETE",
      })
      setTasks(tasks.filter((task) => task.id !== id))
    } catch (error) {
      console.error("Failed to delete task:", error)
    }
  }

  const toggleTaskCompletion = async (id: string) => {
    try {
      const task = tasks.find((t) => t.id === id)
      if (!task) return

      const updatedTask = { ...task, completed: !task.completed }

      await fetch(`/api/tasks/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedTask),
      })

      setTasks(tasks.map((t) => (t.id === id ? updatedTask : t)))
    } catch (error) {
      console.error("Failed to update task:", error)
    }
  }

  return (
    <main className="container mx-auto p-4 max-w-md">
      <h1 className="text-2xl font-bold mb-6">{appName}</h1>

      <form onSubmit={addTask} className="flex gap-2 mb-6">
        <Input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Add a new task..."
          className="flex-1"
        />
        <Button type="submit">
          <PlusCircle className="h-4 w-4 mr-2" />
          Add
        </Button>
      </form>

      <TaskList
        tasks={tasks}
        loading={loading}
        onDelete={deleteTask}
        onToggle={toggleTaskCompletion}
        showCategories={enableTaskCategories}
      />

      <div className="mt-8 text-xs text-muted-foreground">
        <p>Environment: {process.env.NEXT_PUBLIC_NODE_ENV || "development"}</p>
        <p>API URL: {process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api"}</p>
        {enableTaskCategories && <p>Task Categories Enabled</p>}
      </div>
    </main>
  )
}
