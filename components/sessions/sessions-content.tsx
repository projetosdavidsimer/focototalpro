"use client"

import { useState, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Clock, Trash2, Plus, NotebookPen, BookOpen, Check, ChevronDown, CalendarIcon } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { format } from "date-fns"
import {
  createStudySession,
  deleteStudySession,
  getStudySessions,
  getWeeklyStudySummary,
  type StudySessionInput,
} from "@/app/actions/study-sessions"

interface Subject {
  id: string
  name: string
  color: string
}

interface SessionItem {
  id: string
  subject_id: string | null
  duration_minutes: number
  date: string
  notes?: string | null
  subjects?: { name?: string; color?: string } | { name?: string; color?: string }[]
}

interface SessionsContentProps {
  userId: string
  initialSessions: SessionItem[]
  subjects: Subject[]
  initialWeekly: { date: string; minutes: number; hours: number }[]
}

export function SessionsContent({
  userId,
  initialSessions,
  subjects,
  initialWeekly,
}: SessionsContentProps) {
  const [sessions, setSessions] = useState<SessionItem[]>(initialSessions)
  const [weekly, setWeekly] = useState(initialWeekly)
  const [loadingCreate, setLoadingCreate] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [datePickerOpen, setDatePickerOpen] = useState(false)

  const todayStr = useMemo(() => {
    const d = new Date()
    return d.toISOString().split("T")[0]
  }, [])

  const [form, setForm] = useState<StudySessionInput>({
    subject_id: null,
    duration_minutes: 25,
    date: todayStr,
    notes: "",
  })

  const onCreate = async (e: React.FormEvent) => {
    e.preventDefault()

    setLoadingCreate(true)
    setError(null)
    try {
      const minutes = Number(form.duration_minutes)
      if (!Number.isFinite(minutes) || minutes <= 0) {
        setError("Informe uma duração válida em minutos.")
        setLoadingCreate(false)
        return
      }

      const payload: StudySessionInput = {
        subject_id: form.subject_id || null,
        duration_minutes: minutes,
        date: form.date,
        notes: form.notes?.trim() ? form.notes.trim() : undefined,
      }

      const result = await createStudySession(userId, payload)
      if (result.error) {
        setError(result.error)
      } else {
        setForm({ subject_id: null, duration_minutes: 25, date: todayStr, notes: "" })
        
        const [updatedSessions, updatedWeekly] = await Promise.all([
          getStudySessions(userId, { limit: 20 }),
          getWeeklyStudySummary(userId),
        ])
        
        if (updatedSessions.data) setSessions(updatedSessions.data)
        if (updatedWeekly.data) setWeekly(updatedWeekly.data)
      }
    } catch {
      setError("Não foi possível registrar a sessão. Tente novamente.")
    } finally {
      setLoadingCreate(false)
    }
  }

  const onDelete = async (id: string) => {
    if (!confirm("Tem certeza que deseja deletar esta sessão?")) return
    
    const result = await deleteStudySession(id)
    if (result.error) return
    
    const [updatedSessions, updatedWeekly] = await Promise.all([
      getStudySessions(userId, { limit: 20 }),
      getWeeklyStudySummary(userId),
    ])
    
    if (updatedSessions.data) setSessions(updatedSessions.data)
    if (updatedWeekly.data) setWeekly(updatedWeekly.data)
  }

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
      <div className="rounded-xl border bg-card p-4">
        <form onSubmit={onCreate} className="grid gap-4 md:grid-cols-4">
          <div className="space-y-2 md:col-span-1">
            <label className="text-sm font-medium">Matéria (opcional)</label>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  type="button"
                  variant="outline"
                  className="w-full justify-between"
                  disabled={loadingCreate}
                >
                  <div className="flex items-center gap-2">
                    <BookOpen className="h-4 w-4" />
                    <span>
                      {form.subject_id
                        ? subjects.find((s) => s.id === form.subject_id)?.name
                        : "Sem matéria"}
                    </span>
                  </div>
                  <ChevronDown className="h-4 w-4 opacity-50" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-[200px]" align="start">
                <DropdownMenuLabel className="text-xs text-muted-foreground">
                  Selecione uma matéria
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => setForm((f) => ({ ...f, subject_id: null }))}
                  className="gap-2"
                >
                  <div className="flex size-6 items-center justify-center rounded-md border bg-transparent">
                    <BookOpen className="size-4" />
                  </div>
                  <span>Sem matéria</span>
                  {!form.subject_id && <Check className="ml-auto h-4 w-4" />}
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                {subjects.map((subject) => (
                  <DropdownMenuItem
                    key={subject.id}
                    onClick={() => setForm((f) => ({ ...f, subject_id: subject.id }))}
                    className="gap-2"
                  >
                    <div
                      className="flex size-6 items-center justify-center rounded-md border"
                      style={{ backgroundColor: subject.color + "20", borderColor: subject.color }}
                    >
                      <BookOpen className="size-4" style={{ color: subject.color }} />
                    </div>
                    <span>{subject.name}</span>
                    {form.subject_id === subject.id && (
                      <Check className="ml-auto h-4 w-4" />
                    )}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Data</label>
            <Popover open={datePickerOpen} onOpenChange={setDatePickerOpen}>
              <PopoverTrigger asChild>
                <Button
                  type="button"
                  variant="outline"
                  className="w-full justify-between font-normal"
                  disabled={loadingCreate}
                >
                  <div className="flex items-center gap-2">
                    <CalendarIcon className="h-4 w-4" />
                    <span>
                      {form.date ? format(new Date(form.date), "dd/MM/yyyy") : "Selecione a data"}
                    </span>
                  </div>
                  <ChevronDown className="h-4 w-4 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto overflow-hidden p-0" align="start">
                <Calendar
                  mode="single"
                  selected={form.date ? new Date(form.date) : undefined}
                  captionLayout="dropdown"
                  onSelect={(date) => {
                    if (date) {
                      setForm((f) => ({ ...f, date: format(date, "yyyy-MM-dd") }))
                      setDatePickerOpen(false)
                    }
                  }}
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="space-y-2">
            <label htmlFor="duration" className="text-sm font-medium">Duração (min)</label>
            <Input
              id="duration"
              type="number"
              min={1}
              step={1}
              value={form.duration_minutes}
              onChange={(e) => setForm((f) => ({ ...f, duration_minutes: Number(e.target.value) }))}
              required
              disabled={loadingCreate}
            />
          </div>

          <div className="space-y-2 md:col-span-1">
            <label htmlFor="notes" className="text-sm font-medium">Notas</label>
            <Input
              id="notes"
              type="text"
              placeholder="Opcional"
              value={form.notes}
              onChange={(e) => setForm((f) => ({ ...f, notes: e.target.value }))}
              disabled={loadingCreate}
            />
          </div>

          <div className="md:col-span-4">
            <Button type="submit" disabled={loadingCreate}>
              {loadingCreate ? "Salvando..." : (
                <span className="inline-flex items-center gap-2"><Plus className="h-4 w-4" /> Registrar sessão</span>
              )}
            </Button>
          </div>

          {error && (
            <div className="md:col-span-4 bg-destructive/10 text-destructive text-sm p-3 rounded-lg">{error}</div>
          )}
        </form>
      </div>

      <div className="grid gap-4 md:grid-cols-7">
        {weekly.map((d) => (
          <div key={d.date} className="rounded-xl border bg-card p-3">
            <div className="text-xs text-muted-foreground">{d.date}</div>
            <div className="mt-1 text-lg font-semibold">{d.hours} h</div>
          </div>
        ))}
      </div>

      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Clock className="h-5 w-5 text-primary" />
          <h2 className="text-lg font-semibold">Últimas sessões</h2>
        </div>

        {sessions.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="rounded-full bg-muted p-6 mb-4">
              <NotebookPen className="h-12 w-12 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Nenhuma sessão registrada</h3>
            <p className="text-muted-foreground max-w-sm">
              Registre sua primeira sessão acima para começar a acompanhar seu progresso.
            </p>
          </div>
        ) : (
          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            {sessions.map((s) => (
              <div key={s.id} className="rounded-xl border bg-card p-4">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="text-sm text-muted-foreground">{s.date}</div>
                    <div className="text-xl font-semibold">{Math.round(s.duration_minutes)} min</div>
                    {(Array.isArray(s.subjects) ? s.subjects[0]?.name : s.subjects?.name) && (
                      <div className="text-sm mt-1">
                        Matéria: <span className="font-medium">
                          {Array.isArray(s.subjects) ? s.subjects[0]?.name : s.subjects?.name}
                        </span>
                      </div>
                    )}
                    {s.notes && (
                      <div className="text-sm text-muted-foreground mt-1">{s.notes}</div>
                    )}
                  </div>
                  <Button variant="outline" size="icon" onClick={() => onDelete(s.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
