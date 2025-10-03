"use client"

import { useState } from "react"
import { Plus, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ExamCard } from "@/components/mock-exams/exam-card"
import { ExamDialog } from "@/components/mock-exams/exam-dialog"
import { getMockExams, deleteMockExam } from "@/app/actions/mock-exams"

interface MockExam {
  id: string
  title: string
  total_questions: number
  correct_answers: number
  date: string
  notes?: string
}

interface SimuladosContentProps {
  userId: string
  initialExams: MockExam[]
}

export function SimuladosContent({ userId, initialExams }: SimuladosContentProps) {
  const [exams, setExams] = useState<MockExam[]>(initialExams)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editingExam, setEditingExam] = useState<MockExam | undefined>()

  const handleEdit = (exam: MockExam) => {
    setEditingExam(exam)
    setDialogOpen(true)
  }

  const handleDelete = async (examId: string) => {
    if (!confirm("Tem certeza que deseja deletar este simulado?")) {
      return
    }

    const result = await deleteMockExam(examId)
    
    if (result.success) {
      const updatedExams = await getMockExams(userId)
      if (updatedExams.data) {
        setExams(updatedExams.data)
      }
    }
  }

  const handleDialogClose = () => {
    setDialogOpen(false)
    setEditingExam(undefined)
  }

  const handleSuccess = async () => {
    const updatedExams = await getMockExams(userId)
    if (updatedExams.data) {
      setExams(updatedExams.data)
    }
  }

  const totalExams = exams.length
  const averageScore = totalExams > 0
    ? Math.round(
        exams.reduce((acc, exam) => 
          acc + (exam.correct_answers / exam.total_questions) * 100, 0
        ) / totalExams
      )
    : 0

  return (
    <>
      <div className="flex flex-1 flex-col gap-4 p-4 pt-6">
        {totalExams === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center text-center">
            <div className="rounded-full bg-muted p-6 mb-4">
              <FileText className="h-12 w-12 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold mb-2">
              Nenhum simulado registrado
            </h3>
            <p className="text-muted-foreground mb-4 max-w-sm">
              Comece registrando os resultados dos seus simulados para
              acompanhar sua evolução.
            </p>
            <Button onClick={() => setDialogOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Registrar Primeiro Simulado
            </Button>
          </div>
        ) : (
          <>
            <div>
              <h1 className="text-2xl font-bold">Meus Simulados</h1>
              <p className="text-muted-foreground">
                Acompanhe seu desempenho nos simulados
              </p>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              <div className="rounded-xl border bg-card p-4">
                <div className="text-sm text-muted-foreground mb-1">
                  Total de Simulados
                </div>
                <div className="text-3xl font-bold">{totalExams}</div>
              </div>
              <div className="rounded-xl border bg-card p-4">
                <div className="text-sm text-muted-foreground mb-1">
                  Média Geral
                </div>
                <div className={`text-3xl font-bold ${
                  averageScore >= 70 ? 'text-green-600' : 'text-orange-600'
                }`}>
                  {averageScore}%
                </div>
              </div>
              <div className="rounded-xl border bg-card p-4">
                <div className="text-sm text-muted-foreground mb-1">
                  Último Resultado
                </div>
                <div className={`text-3xl font-bold ${
                  exams[0] && (exams[0].correct_answers / exams[0].total_questions) * 100 >= 70
                    ? 'text-green-600'
                    : 'text-orange-600'
                }`}>
                  {exams[0] 
                    ? Math.round((exams[0].correct_answers / exams[0].total_questions) * 100)
                    : 0}%
                </div>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {exams.map((exam) => (
              <ExamCard
                key={exam.id}
                exam={exam}
                onEdit={() => handleEdit(exam)}
                onDelete={() => handleDelete(exam.id)}
              />
            ))}
            <button
              onClick={() => setDialogOpen(true)}
              className="rounded-xl border-2 border-dashed border-muted-foreground/25 hover:border-muted-foreground/50 hover:bg-muted/50 transition-colors p-6 flex flex-col items-center justify-center gap-2 min-h-[200px]"
            >
              <Plus className="h-8 w-8 text-muted-foreground" />
              <span className="text-sm font-medium text-muted-foreground">Registrar Simulado</span>
            </button>
          </div>
          </>
        )}
      </div>

      <ExamDialog
        open={dialogOpen}
        onOpenChange={handleDialogClose}
        userId={userId}
        exam={editingExam}
        onSuccess={handleSuccess}
      />
    </>
  )
}
