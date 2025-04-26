"use client"

import { Loader2, Trash } from "lucide-react"
import type { Task } from "@/types/task"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"

interface TaskListProps {
  tasks: Task[]
  loading: boolean
  onDelete: (id: string) => void
  onToggle: (id: string) => void
  showCategories?: boolean
}

export function TaskList({ tasks, loading, onDelete, onToggle, showCategories = false }: TaskListProps) {
  if (loading) {
    return (
      <div className="flex justify-center py-8">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    )
  }

  if (tasks.length === 0) {
    return <p className="text-center text-muted-foreground py-8">No tasks yet. Add one above!</p>
  }

  return (
    <ul className="space-y-3">
      {tasks.map((task) => (
        <li key={task.id} className="flex items-center justify-between p-3 border rounded-md bg-card">
          <div className="flex items-center gap-3">
            <Checkbox checked={task.completed} onCheckedChange={() => onToggle(task.id)} id={`task-${task.id}`} />
            <label
              htmlFor={`task-${task.id}`}
              className={`${task.completed ? "line-through text-muted-foreground" : ""}`}
            >
              {task.title}
            </label>
          </div>

          <div className="flex items-center gap-2">
            {showCategories && task.category && (
              <span className="text-xs bg-muted px-2 py-1 rounded-full">{task.category}</span>
            )}
            <Button variant="ghost" size="icon" onClick={() => onDelete(task.id)} className="h-8 w-8 text-destructive">
              <Trash className="h-4 w-4" />
              <span className="sr-only">Delete</span>
            </Button>
          </div>
        </li>
      ))}
    </ul>
  )
}
