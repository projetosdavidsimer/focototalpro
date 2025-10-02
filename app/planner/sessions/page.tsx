"use client"

import { useEffect, useMemo, useState } from "react"
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
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { ThemeToggle } from "@/components/theme-toggle"
import { getCurrentUser } from "@/app/actions/auth"
import {
  getStudySessions,
  createStudySession,
  deleteStudySession,
  getWeeklyStudySummary,
  type StudySessionInput,
} from "@/app/actions/study-sessions"
import { getSubjects } from "@/app/actions/subjects"
import { useRouter } from "next/navigation"
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
import { ptBR } from "date-fns/locale"

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

export default function StudySessionsPage() {
  const router = useRouter()
  const [user, setUser] = useState<{
    id: string
    full_name: string
    email: string
    avatar_url: string
  } | null>(null)

  const [loadingList, setLoadingList] = useState(true)
  const [loadingCreate, setLoadingCreate] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [sessions, setSessions] = useState<SessionItem[]>([])
  const [subjects, setSubjects] = useState<Subject[]>([])

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

  const [weekly, setWeekly] = useState<
    { date: string; minutes: number; hours: number }[]
  >([])

  const [datePickerOpen, setDatePickerOpen] = useState(false)

  const loadUser = async () => {
    const currentUser = await getCurrentUser()
    if (!currentUser) {
      router.push("/login")
      return
    }
    setUser(currentUser)
  }

  const loadSubjects = async (userId: string) => {
    const result = await getSubjects(userId)
    if (result.data) {
      setSubjects(
        result.data.map((s) => ({ id: s.id, name: s.name, color: s.color }))
      )
    }
  }

  const loadSessions = async (userId: string) => {
    setLoadingList(true)
    const result = await getStudySessions(userId, { limit: 20 })
    if (result.data) {
      setSessions(result.data)
    }
    setLoadingList(false)
  }

  const loadWeekly = async (userId: string) => {
    const result = await getWeeklyStudySummary(userId)
    if (result.data) {
      setWeekly(result.data)
    }
  }

  useEffect(() => {
    loadUser()
  }, [])

  useEffect(() => {
    if (user) {
      loadSubjects(user.id)
      loadSessions(user.id)
      loadWeekly(user.id)
    }
  }, [user])

  const onCreate = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user) return

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

      const result = await createStudySession(user.id, payload)
      if (result.error) {
        setError(result.error)
      } else {
        setForm({ subject_id: null, duration_minutes: 25, date: todayStr, notes: "" })
        await Promise.all([loadSessions(user.id), loadWeekly(user.id)])
      }
    } catch {
      setError("Não foi possível registrar a sessão. Tente novamente.")
    } finally {
      setLoadingCreate(false)
    }
  }

  const onDelete = async (id: string) => {
    if (!user) return
    if (!confirm("Tem certeza que deseja deletar esta sessão?")) return
    const result = await deleteStudySession(id)
    if (result.error) return
    await Promise.all([loadSessions(user.id), loadWeekly(user.id)])
  }

  if (!user) return null

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
            <Separator orientation="vertical" className="mr-2 data-[orientation=vertical]:h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="/planner">Planejamento</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Sessões de Estudo</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          <div className="ml-auto px-4">
            <ThemeToggle />
          </div>
        </header>

        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          {/* Formulário de criação */}
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

          {/* Resumo semanal simples */}
          <div className="grid gap-4 md:grid-cols-7">
            {weekly.map((d) => (
              <div key={d.date} className="rounded-xl border bg-card p-3">
                <div className="text-xs text-muted-foreground">{d.date}</div>
                <div className="mt-1 text-lg font-semibold">{d.hours} h</div>
              </div>
            ))}
          </div>

          {/* Lista de sessões */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-primary" />
              <h2 className="text-lg font-semibold">Últimas sessões</h2>
            </div>

            {loadingList ? (
              <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="h-24 rounded-xl border bg-muted/50 animate-pulse" />
                ))}
              </div>
            ) : sessions.length === 0 ? (
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
      </SidebarInset>
    </SidebarProvider>
  )
}
