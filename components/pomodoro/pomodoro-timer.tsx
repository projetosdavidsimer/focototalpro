"use client"

import { useEffect, useState, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Play, Pause, RotateCcw, Settings2, X, BookOpen, Check } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Separator } from "@/components/ui/separator"
import { createStudySession } from "@/app/actions/study-sessions"

type TimerMode = "focus" | "shortBreak" | "longBreak"

interface Subject {
  id: string
  name: string
  color: string
}

interface PomodoroTimerProps {
  userId: string
  subjects: Subject[]
}

export function PomodoroTimer({ userId, subjects }: PomodoroTimerProps) {
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null)
  const [mode, setMode] = useState<TimerMode>("focus")
  const [timeLeft, setTimeLeft] = useState(25 * 60)
  const [isRunning, setIsRunning] = useState(false)
  const [completedCycles, setCompletedCycles] = useState(0)
  const [showSettings, setShowSettings] = useState(false)

  const [focusMinutes, setFocusMinutes] = useState(25)
  const [shortBreakMinutes, setShortBreakMinutes] = useState(5)
  const [longBreakMinutes, setLongBreakMinutes] = useState(15)

  const handleTimerComplete = useCallback(async () => {
    setIsRunning(false)

    if (mode === "focus") {
      const today = new Date().toISOString().split("T")[0]
      await createStudySession(userId, {
        subject_id: selectedSubject,
        duration_minutes: focusMinutes,
        date: today,
        notes: "Sessão Pomodoro",
      })

      setCompletedCycles((prev) => prev + 1)
      
      const nextMode = (completedCycles + 1) % 4 === 0 ? "longBreak" : "shortBreak"
      setMode(nextMode)
      setTimeLeft(nextMode === "longBreak" ? longBreakMinutes * 60 : shortBreakMinutes * 60)

      if ("Notification" in window && Notification.permission === "granted") {
        new Notification("Pomodoro Completo!", {
          body: nextMode === "longBreak" 
            ? `Hora de fazer uma pausa longa de ${longBreakMinutes} minutos.`
            : `Hora de fazer uma pausa de ${shortBreakMinutes} minutos.`,
        })
      }
    } else {
      setMode("focus")
      setTimeLeft(focusMinutes * 60)

      if ("Notification" in window && Notification.permission === "granted") {
        new Notification("Pausa Completa!", {
          body: "Hora de voltar ao foco!",
        })
      }
    }
  }, [mode, userId, selectedSubject, focusMinutes, completedCycles, longBreakMinutes, shortBreakMinutes])

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null

    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1)
      }, 1000)
    } else if (timeLeft === 0) {
      handleTimerComplete()
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isRunning, timeLeft, handleTimerComplete])

  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("pomodoro-state")
      if (saved) {
        try {
          const state = JSON.parse(saved)
          setMode(state.mode || "focus")
          setTimeLeft(state.timeLeft || 25 * 60)
          setCompletedCycles(state.completedCycles || 0)
          setSelectedSubject(state.selectedSubject || null)
        } catch {
          // Ignorar erro
        }
      }

      const savedSettings = localStorage.getItem("pomodoro-settings")
      if (savedSettings) {
        try {
          const settings = JSON.parse(savedSettings)
          setFocusMinutes(settings.focusMinutes || 25)
          setShortBreakMinutes(settings.shortBreakMinutes || 5)
          setLongBreakMinutes(settings.longBreakMinutes || 15)
        } catch {
          // Ignorar erro
        }
      }
    }
  }, [])

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem(
        "pomodoro-state",
        JSON.stringify({ mode, timeLeft, completedCycles, selectedSubject })
      )
    }
  }, [mode, timeLeft, completedCycles, selectedSubject])

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem(
        "pomodoro-settings",
        JSON.stringify({ focusMinutes, shortBreakMinutes, longBreakMinutes })
      )
    }
  }, [focusMinutes, shortBreakMinutes, longBreakMinutes])

  const handlePlayPause = () => {
    if (!isRunning && "Notification" in window && Notification.permission === "default") {
      Notification.requestPermission()
    }
    setIsRunning(!isRunning)
  }

  const handleReset = () => {
    setIsRunning(false)
    setMode("focus")
    setTimeLeft(focusMinutes * 60)
  }

  const handleModeChange = (newMode: TimerMode) => {
    setIsRunning(false)
    setMode(newMode)
    if (newMode === "focus") {
      setTimeLeft(focusMinutes * 60)
    } else if (newMode === "shortBreak") {
      setTimeLeft(shortBreakMinutes * 60)
    } else {
      setTimeLeft(longBreakMinutes * 60)
    }
  }

  const applySettings = () => {
    setIsRunning(false)
    if (mode === "focus") {
      setTimeLeft(focusMinutes * 60)
    } else if (mode === "shortBreak") {
      setTimeLeft(shortBreakMinutes * 60)
    } else {
      setTimeLeft(longBreakMinutes * 60)
    }
    setShowSettings(false)
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const getTotalTime = () => {
    if (mode === "focus") return focusMinutes * 60
    if (mode === "shortBreak") return shortBreakMinutes * 60
    return longBreakMinutes * 60
  }

  const progress = ((getTotalTime() - timeLeft) / getTotalTime()) * 100

  const getModeLabel = () => {
    if (mode === "focus") return "Foco"
    if (mode === "shortBreak") return "Pausa Curta"
    return "Pausa Longa"
  }

  return (
    <div className="flex flex-1 flex-col items-center justify-center p-8 overflow-hidden">
      {showSettings && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="bg-card border rounded-lg shadow-lg w-full max-w-md p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold">Configurações</h2>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowSettings(false)}
              >
                <X className="h-5 w-5" />
              </Button>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Tempo de Foco (minutos)</label>
                <Input
                  type="number"
                  min={1}
                  max={60}
                  value={focusMinutes}
                  onChange={(e) => setFocusMinutes(Number(e.target.value))}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Pausa Curta (minutos)</label>
                <Input
                  type="number"
                  min={1}
                  max={30}
                  value={shortBreakMinutes}
                  onChange={(e) => setShortBreakMinutes(Number(e.target.value))}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Pausa Longa (minutos)</label>
                <Input
                  type="number"
                  min={1}
                  max={60}
                  value={longBreakMinutes}
                  onChange={(e) => setLongBreakMinutes(Number(e.target.value))}
                />
              </div>

              <Button onClick={applySettings} className="w-full">
                Salvar Configurações
              </Button>
            </div>
          </div>
        </div>
      )}

      <div className="absolute top-4 right-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setShowSettings(!showSettings)}
        >
          <Settings2 className="h-5 w-5" />
        </Button>
      </div>

      <div className="flex gap-2 mb-8">
        <Button
          variant={mode === "focus" ? "default" : "outline"}
          onClick={() => handleModeChange("focus")}
          disabled={isRunning}
          size="lg"
        >
          Foco
        </Button>
        <Button
          variant={mode === "shortBreak" ? "default" : "outline"}
          onClick={() => handleModeChange("shortBreak")}
          disabled={isRunning}
          size="lg"
        >
          Pausa Curta
        </Button>
        <Button
          variant={mode === "longBreak" ? "default" : "outline"}
          onClick={() => handleModeChange("longBreak")}
          disabled={isRunning}
          size="lg"
        >
          Pausa Longa
        </Button>
      </div>

      <div className="relative mb-8">
        <svg className="w-80 h-80 transform -rotate-90">
          <circle
            cx="160"
            cy="160"
            r="150"
            stroke="currentColor"
            strokeWidth="12"
            fill="none"
            className="text-muted/30"
          />
          <circle
            cx="160"
            cy="160"
            r="150"
            stroke="currentColor"
            strokeWidth="12"
            fill="none"
            strokeDasharray={`${2 * Math.PI * 150}`}
            strokeDashoffset={`${2 * Math.PI * 150 * (1 - progress / 100)}`}
            className="text-primary transition-all duration-1000 ease-linear"
            strokeLinecap="round"
          />
        </svg>

        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="text-8xl font-bold tabular-nums tracking-tight">
            {formatTime(timeLeft)}
          </div>
          <div className="text-lg text-muted-foreground mt-2">
            {getModeLabel()}
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4 mb-8">
        <Button
          size="lg"
          onClick={handlePlayPause}
          className="w-40 h-14 text-lg"
        >
          {isRunning ? (
            <>
              <Pause className="h-6 w-6 mr-2" />
              Pausar
            </>
          ) : (
            <>
              <Play className="h-6 w-6 mr-2" />
              Iniciar
            </>
          )}
        </Button>

        <Button
          size="lg"
          variant="outline"
          onClick={handleReset}
          className="h-14"
        >
          <RotateCcw className="h-5 w-5" />
        </Button>
      </div>

      <div className="flex items-center gap-8">
        <div className="flex flex-col items-center">
          <div className="text-3xl font-bold">{completedCycles}</div>
          <div className="text-sm text-muted-foreground">Ciclos Completos</div>
        </div>

        <Separator orientation="vertical" className="h-12" />

        <div className="flex flex-col gap-2">
          <label className="text-sm text-muted-foreground">Matéria</label>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="min-w-[200px] justify-between"
                disabled={isRunning}
              >
                <div className="flex items-center gap-2">
                  <BookOpen className="h-4 w-4" />
                  <span>
                    {selectedSubject
                      ? subjects.find((s) => s.id === selectedSubject)?.name
                      : "Nenhuma"}
                  </span>
                </div>
                <Settings2 className="h-4 w-4 opacity-50" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-[200px]" align="end">
              <DropdownMenuLabel className="text-xs text-muted-foreground">
                Selecione uma matéria
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => setSelectedSubject(null)}
                className="gap-2"
              >
                <div className="flex size-6 items-center justify-center rounded-md border bg-transparent">
                  <BookOpen className="size-4" />
                </div>
                <span>Nenhuma</span>
                {!selectedSubject && <Check className="ml-auto h-4 w-4" />}
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              {subjects.map((subject) => (
                <DropdownMenuItem
                  key={subject.id}
                  onClick={() => setSelectedSubject(subject.id)}
                  className="gap-2"
                >
                  <div
                    className="flex size-6 items-center justify-center rounded-md border"
                    style={{ backgroundColor: subject.color + "20", borderColor: subject.color }}
                  >
                    <BookOpen className="size-4" style={{ color: subject.color }} />
                  </div>
                  <span>{subject.name}</span>
                  {selectedSubject === subject.id && (
                    <Check className="ml-auto h-4 w-4" />
                  )}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  )
}
