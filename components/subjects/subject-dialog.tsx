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
import { createSubject, updateSubject } from "@/app/actions/subjects"

interface SubjectDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  userId: string
  subject?: {
    id: string
    name: string
    color: string
    target_hours_per_week: number
  }
  onSuccess: () => void
}

const PRESET_COLORS = [
  "#3b82f6", // blue
  "#ef4444", // red
  "#10b981", // green
  "#f59e0b", // amber
  "#8b5cf6", // purple
  "#ec4899", // pink
  "#06b6d4", // cyan
  "#f97316", // orange
]

export function SubjectDialog({
  open,
  onOpenChange,
  userId,
  subject,
  onSuccess,
}: SubjectDialogProps) {
  const [name, setName] = useState("")
  const [color, setColor] = useState("#3b82f6")
  const [targetHours, setTargetHours] = useState(5)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (subject) {
      setName(subject.name)
      setColor(subject.color)
      setTargetHours(subject.target_hours_per_week)
    } else {
      setName("")
      setColor("#3b82f6")
      setTargetHours(5)
    }
    setError(null)
  }, [subject, open])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      if (subject) {
        // Update
        const result = await updateSubject(subject.id, {
          name,
          color,
          target_hours_per_week: targetHours,
        })
        
        if (result.error) {
          setError(result.error)
        } else {
          onSuccess()
          onOpenChange(false)
        }
      } else {
        // Create
        const result = await createSubject(userId, {
          name,
          color,
          target_hours_per_week: targetHours,
        })
        
        if (result.error) {
          setError(result.error)
        } else {
          onSuccess()
          onOpenChange(false)
        }
      }
    } catch {
      setError("Erro ao salvar matéria")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {subject ? "Editar Matéria" : "Nova Matéria"}
          </DialogTitle>
          <DialogDescription>
            {subject
              ? "Atualize as informações da matéria"
              : "Adicione uma nova matéria ao seu planejamento"}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-medium">
              Nome da Matéria
            </label>
            <Input
              id="name"
              placeholder="Ex: Direito Constitucional"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              disabled={loading}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Cor</label>
            <div className="flex gap-2 flex-wrap">
              {PRESET_COLORS.map((presetColor) => (
                <button
                  key={presetColor}
                  type="button"
                  className={`w-10 h-10 rounded-lg border-2 transition-all ${
                    color === presetColor
                      ? "border-foreground scale-110"
                      : "border-transparent hover:scale-105"
                  }`}
                  style={{ backgroundColor: presetColor }}
                  onClick={() => setColor(presetColor)}
                  disabled={loading}
                />
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="targetHours" className="text-sm font-medium">
              Meta de Horas por Semana
            </label>
            <Input
              id="targetHours"
              type="number"
              min="1"
              max="168"
              value={targetHours}
              onChange={(e) => setTargetHours(parseInt(e.target.value))}
              required
              disabled={loading}
            />
            <p className="text-xs text-muted-foreground">
              Quantas horas você pretende estudar esta matéria por semana?
            </p>
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
              {loading ? "Salvando..." : subject ? "Atualizar" : "Criar"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
