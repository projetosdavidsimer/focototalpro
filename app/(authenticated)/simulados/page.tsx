"use client"

import { useState, useEffect, useCallback } from "react"
import { Plus, FileText } from "lucide-react"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { ThemeToggle } from "@/components/theme-toggle"
import { ExamCard } from "@/components/mock-exams/exam-card"
import { ExamDialog } from "@/components/mock-exams/exam-dialog"
import { getMockExams, deleteMockExam } from "@/app/actions/mock-exams"
import { getCurrentUser } from "@/app/actions/auth"
import { useRouter } from "next/navigation"

interface MockExam {
  id: string
  title: string
  total_questions: number
  correct_answers: number
  date: string
  notes?: string
}

export default function SimuladosPage() {
  const router = useRouter()
  const [user, setUser] = useState<{ id: string; full_name: string; email: string; avatar_url: string } | null>(null)
  const [exams, setExams] = useState<MockExam[]>([])
  const [loading, setLoading] = useState(true)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editingExam, setEditingExam] = useState<MockExam | undefined>()

  const loadUser = useCallback(async () => {
    const currentUser = await getCurrentUser()
    if (!currentUser) {
      router.push('/login')
      return
    }
    setUser(currentUser)
  }, [router])

  const loadExams = useCallback(async (userId: string) => {
    setLoading(true)
    const result = await getMockExams(userId)
    
    if (result.data) {
      setExams(result.data)
    }
    setLoading(false)
  }, [])

  useEffect(() => {
    loadUser()
  }, [loadUser])

  useEffect(() => {
    if (user) {
      loadExams(user.id)
    }
  }, [user, loadExams])

  const handleEdit = (exam: MockExam) => {
    setEditingExam(exam)
    setDialogOpen(true)
  }

  const handleDelete = async (examId: string) => {
    if (!confirm("Tem certeza que deseja deletar este simulado?")) {
      return
    }

    const result = await deleteMockExam(examId)
    
    if (result.success && user) {
      loadExams(user.id)
    }
  }

  const handleDialogClose = () => {
    setDialogOpen(false)
    setEditingExam(undefined)
  }

  const handleSuccess = () => {
    if (user) {
      loadExams(user.id)
    }
  }

  if (!user) {
    return null
  }

  // Calcular estatísticas
  const totalExams = exams.length
  const averageScore = totalExams > 0
    ? Math.round(
        exams.reduce((acc, exam) => 
          acc + (exam.correct_answers / exam.total_questions) * 100, 0
        ) / totalExams
      )
    : 0

  return (
    <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbPage>Simulados</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          <div className="ml-auto px-4">
            <ThemeToggle />
          </div>
        </header>

        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">Meus Simulados</h1>
              <p className="text-muted-foreground">
                Acompanhe seu desempenho nos simulados
              </p>
            </div>
            <Button onClick={() => setDialogOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Registrar Simulado
            </Button>
          </div>

          {totalExams > 0 && (
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
          )}

          {loading ? (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="h-40 rounded-xl border bg-muted/50 animate-pulse"
                />
              ))}
            </div>
          ) : exams.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
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
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {exams.map((exam) => (
                <ExamCard
                  key={exam.id}
                  exam={exam}
                  onEdit={() => handleEdit(exam)}
                  onDelete={() => handleDelete(exam.id)}
                />
              ))}
            </div>
          )}
        </div>

      <ExamDialog
        open={dialogOpen}
        onOpenChange={handleDialogClose}
        userId={user.id}
        exam={editingExam}
        onSuccess={handleSuccess}
      />
    </SidebarInset>
  )
}
