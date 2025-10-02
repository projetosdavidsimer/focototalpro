"use client"

import { useState } from "react"
import { Plus, BookOpen } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SubjectCard } from "@/components/subjects/subject-card"
import { SubjectDialog } from "@/components/subjects/subject-dialog"
import { deleteSubject, getSubjects } from "@/app/actions/subjects"

interface Subject {
  id: string
  name: string
  color: string
  target_hours_per_week: number
}

interface SubjectsContentProps {
  userId: string
  initialSubjects: Subject[]
}

export function SubjectsContent({ userId, initialSubjects }: SubjectsContentProps) {
  const [subjects, setSubjects] = useState<Subject[]>(initialSubjects)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editingSubject, setEditingSubject] = useState<Subject | undefined>()

  const handleEdit = (subject: Subject) => {
    setEditingSubject(subject)
    setDialogOpen(true)
  }

  const handleDelete = async (subjectId: string) => {
    if (!confirm("Tem certeza que deseja deletar esta matéria?")) {
      return
    }

    const result = await deleteSubject(subjectId)
    
    if (result.success) {
      const updatedSubjects = await getSubjects(userId)
      if (updatedSubjects.data) {
        setSubjects(updatedSubjects.data)
      }
    }
  }

  const handleDialogClose = () => {
    setDialogOpen(false)
    setEditingSubject(undefined)
  }

  const handleSuccess = async () => {
    const updatedSubjects = await getSubjects(userId)
    if (updatedSubjects.data) {
      setSubjects(updatedSubjects.data)
    }
  }

  return (
    <>
      <div className="flex flex-1 flex-col gap-4 p-4 pt-6">
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

        {subjects.length === 0 ? (
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

      <SubjectDialog
        open={dialogOpen}
        onOpenChange={handleDialogClose}
        userId={userId}
        subject={editingSubject}
        onSuccess={handleSuccess}
      />
    </>
  )
}
