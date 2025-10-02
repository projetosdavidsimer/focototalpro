"use client"

import { useState, useEffect, useCallback } from "react"
import { Plus, BookOpen } from "lucide-react"
import { AppSidebar } from "@/components/app-sidebar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { ThemeToggle } from "@/components/theme-toggle"
import { SubjectCard } from "@/components/subjects/subject-card"
import { SubjectDialog } from "@/components/subjects/subject-dialog"
import { getSubjects, deleteSubject } from "@/app/actions/subjects"
import { getCurrentUser } from "@/app/actions/auth"
import { useRouter } from "next/navigation"

interface Subject {
  id: string
  name: string
  color: string
  target_hours_per_week: number
}

export default function SubjectsPage() {
  const router = useRouter()
  const [user, setUser] = useState<{ id: string; full_name: string; email: string; avatar_url: string } | null>(null)
  const [subjects, setSubjects] = useState<Subject[]>([])
  const [loading, setLoading] = useState(true)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editingSubject, setEditingSubject] = useState<Subject | undefined>()

  const loadUser = useCallback(async () => {
    const currentUser = await getCurrentUser()
    if (!currentUser) {
      router.push('/login')
      return
    }
    setUser(currentUser)
  }, [router])

  const loadSubjects = useCallback(async (userId: string) => {
    setLoading(true)
    const result = await getSubjects(userId)
    
    if (result.data) {
      setSubjects(result.data)
    }
    setLoading(false)
  }, [])

  useEffect(() => {
    loadUser()
  }, [loadUser])

  useEffect(() => {
    if (user) {
      loadSubjects(user.id)
    }
  }, [user, loadSubjects])

  const handleEdit = (subject: Subject) => {
    setEditingSubject(subject)
    setDialogOpen(true)
  }

  const handleDelete = async (subjectId: string) => {
    if (!confirm("Tem certeza que deseja deletar esta matéria?")) {
      return
    }

    const result = await deleteSubject(subjectId)
    
    if (result.success && user) {
      loadSubjects(user.id)
    }
  }

  const handleDialogClose = () => {
    setDialogOpen(false)
    setEditingSubject(undefined)
  }

  const handleSuccess = () => {
    if (user) {
      loadSubjects(user.id)
    }
  }

  if (!user) {
    return null
  }

  const userData = {
    name: user.full_name,
    email: user.email,
    avatar: user.avatar_url,
  }

  return (
    <SidebarProvider>
      <AppSidebar user={userData} />
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
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="/planner">
                    Planejamento
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Minhas Matérias</BreadcrumbPage>
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
              <h1 className="text-2xl font-bold">Minhas Matérias</h1>
              <p className="text-muted-foreground">
                Gerencie as matérias do seu planejamento de estudos
              </p>
            </div>
            <Button onClick={() => setDialogOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Nova Matéria
            </Button>
          </div>

          {loading ? (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="h-24 rounded-xl border bg-muted/50 animate-pulse"
                />
              ))}
            </div>
          ) : subjects.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="rounded-full bg-muted p-6 mb-4">
                <BookOpen className="h-12 w-12 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold mb-2">
                Nenhuma matéria cadastrada
              </h3>
              <p className="text-muted-foreground mb-4 max-w-sm">
                Comece adicionando as matérias que você está estudando para
                organizar seu planejamento.
              </p>
              <Button onClick={() => setDialogOpen(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Adicionar Primeira Matéria
              </Button>
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {subjects.map((subject) => (
                <SubjectCard
                  key={subject.id}
                  subject={subject}
                  onEdit={() => handleEdit(subject)}
                  onDelete={() => handleDelete(subject.id)}
                />
              ))}
            </div>
          )}
        </div>
      </SidebarInset>

      <SubjectDialog
        open={dialogOpen}
        onOpenChange={handleDialogClose}
        userId={user.id}
        subject={editingSubject}
        onSuccess={handleSuccess}
      />
    </SidebarProvider>
  )
}
