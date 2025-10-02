"use client"

import { Pencil, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"

interface SubjectCardProps {
  subject: {
    id: string
    name: string
    color: string
    target_hours_per_week: number
  }
  onEdit: () => void
  onDelete: () => void
}

export function SubjectCard({ subject, onEdit, onDelete }: SubjectCardProps) {
  return (
    <div className="rounded-xl border bg-card p-4 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3 flex-1">
          <div
            className="w-4 h-4 rounded-full flex-shrink-0"
            style={{ backgroundColor: subject.color }}
          />
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-lg truncate">{subject.name}</h3>
            <p className="text-sm text-muted-foreground">
              Meta: {subject.target_hours_per_week}h por semana
            </p>
          </div>
        </div>
        
        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={onEdit}
            className="h-8 w-8"
          >
            <Pencil className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={onDelete}
            className="h-8 w-8 text-destructive hover:text-destructive"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
