"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { createMockExam, updateMockExam } from "@/app/actions/mock-exams"

interface ExamDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  userId: string
  exam?: {
    id: string
    title: string
    total_questions: number
    correct_answers: number
    date: string
    notes?: string
  }
  onSuccess: () => void
}

export function ExamDialog({
  open,
  onOpenChange,
  userId,
  exam,
  onSuccess,
}: ExamDialogProps) {
  const [title, setTitle] = useState("")
  const [totalQuestions, setTotalQuestions] = useState(100)
  const [correctAnswers, setCorrectAnswers] = useState(0)
  const [date, setDate] = useState(new Date().toISOString().split('T')[0])
  const [notes, setNotes] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (exam) {
      setTitle(exam.title)
      setTotalQuestions(exam.total_questions)
      setCorrectAnswers(exam.correct_answers)
      setDate(exam.date)
      setNotes(exam.notes || "")
    } else {
      setTitle("")
      setTotalQuestions(100)
      setCorrectAnswers(0)
      setDate(new Date().toISOString().split('T')[0])
      setNotes("")
    }
    setError(null)
  }, [exam, open])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    if (correctAnswers > totalQuestions) {
      setError("Acertos não pode ser maior que total de questões")
      setLoading(false)
      return
    }

    try {
      if (exam) {
        // Update
        const result = await updateMockExam(exam.id, {
          title,
          total_questions: totalQuestions,
          correct_answers: correctAnswers,
          date,
          notes: notes || undefined,
        })
        
        if (result.error) {
          setError(result.error)
        } else {
          onSuccess()
          onOpenChange(false)
        }
      } else {
        // Create
        const result = await createMockExam(userId, {
          title,
          total_questions: totalQuestions,
          correct_answers: correctAnswers,
          date,
          notes: notes || undefined,
        })
        
        if (result.error) {
          setError(result.error)
        } else {
          onSuccess()
          onOpenChange(false)
        }
      }
    } catch {
      setError("Erro ao salvar simulado")
    } finally {
      setLoading(false)
    }
  }

  const percentage = totalQuestions > 0 
    ? Math.round((correctAnswers / totalQuestions) * 100) 
    : 0

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>
            {exam ? "Editar Simulado" : "Registrar Simulado"}
          </DialogTitle>
          <DialogDescription>
            {exam
              ? "Atualize as informações do simulado"
              : "Registre o resultado do seu simulado"}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="title" className="text-sm font-medium">
              Título do Simulado
            </label>
            <Input
              id="title"
              placeholder="Ex: Simulado CESPE 2024"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              disabled={loading}
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="date" className="text-sm font-medium">
              Data
            </label>
            <Input
              id="date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
              disabled={loading}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="totalQuestions" className="text-sm font-medium">
                Total de Questões
              </label>
              <Input
                id="totalQuestions"
                type="number"
                min="1"
                value={totalQuestions}
                onChange={(e) => setTotalQuestions(parseInt(e.target.value) || 0)}
                required
                disabled={loading}
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="correctAnswers" className="text-sm font-medium">
                Acertos
              </label>
              <Input
                id="correctAnswers"
                type="number"
                min="0"
                max={totalQuestions}
                value={correctAnswers}
                onChange={(e) => setCorrectAnswers(parseInt(e.target.value) || 0)}
                required
                disabled={loading}
              />
            </div>
          </div>

          {totalQuestions > 0 && (
            <div className="rounded-lg bg-muted p-3">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Aproveitamento</span>
                <span className={`text-xl font-bold ${
                  percentage >= 70 ? 'text-green-600' : 'text-orange-600'
                }`}>
                  {percentage}%
                </span>
              </div>
              <div className="w-full bg-background rounded-full h-2">
                <div
                  className={`h-2 rounded-full transition-all ${
                    percentage >= 70 ? 'bg-green-600' : 'bg-orange-600'
                  }`}
                  style={{ width: `${percentage}%` }}
                />
              </div>
            </div>
          )}

          <div className="space-y-2">
            <label htmlFor="notes" className="text-sm font-medium">
              Observações (opcional)
            </label>
            <textarea
              id="notes"
              className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              placeholder="Ex: Dificuldade em Direito Constitucional..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              disabled={loading}
            />
          </div>

          {error && (
            <div className="bg-destructive/10 text-destructive text-sm p-3 rounded-lg">
              {error}
            </div>
          )}

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={loading}
            >
              Cancelar
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? "Salvando..." : exam ? "Atualizar" : "Registrar"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
