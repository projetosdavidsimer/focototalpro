"use client"

import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { Calendar, CheckCircle2, XCircle, Pencil, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ExamCardProps {
  exam: {
    id: string
    title: string
    total_questions: number
    correct_answers: number
    date: string
    notes?: string
  }
  onEdit: () => void
  onDelete: () => void
}

export function ExamCard({ exam, onEdit, onDelete }: ExamCardProps) {
  const percentage = Math.round((exam.correct_answers / exam.total_questions) * 100)
  const isPassing = percentage >= 70

  return (
    <div className="rounded-xl border bg-card p-4 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between gap-4 mb-3">
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-lg truncate">{exam.title}</h3>
          <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
            <Calendar className="h-3 w-3" />
            <span>{format(new Date(exam.date), "dd 'de' MMMM 'de' yyyy", { locale: ptBR })}</span>
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

      <div className="flex items-center gap-4">
        <div className="flex-1">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">Acertos</span>
            <span className={`text-2xl font-bold ${isPassing ? 'text-green-600' : 'text-orange-600'}`}>
              {percentage}%
            </span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div
              className={`h-2 rounded-full transition-all ${
                isPassing ? 'bg-green-600' : 'bg-orange-600'
              }`}
              style={{ width: `${percentage}%` }}
            />
          </div>
          <div className="flex items-center justify-between mt-2 text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <CheckCircle2 className="h-3 w-3 text-green-600" />
              <span>{exam.correct_answers} acertos</span>
            </div>
            <div className="flex items-center gap-1">
              <XCircle className="h-3 w-3 text-red-600" />
              <span>{exam.total_questions - exam.correct_answers} erros</span>
            </div>
          </div>
        </div>
      </div>

      {exam.notes && (
        <div className="mt-3 pt-3 border-t">
          <p className="text-sm text-muted-foreground line-clamp-2">{exam.notes}</p>
        </div>
      )}
    </div>
  )
}
