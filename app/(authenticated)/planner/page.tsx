import { Button } from "@/components/ui/button"
import { PageHeader } from "@/components/page-header"
import Link from "next/link"
import { BookOpen, Timer, Files } from "lucide-react"

export default async function PlannerPage() {
  return (
    <>
      <PageHeader
        breadcrumbs={[
          { label: "Planejamento", href: "#" },
          { label: "Visão Geral" },
        ]}
      />
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">Planejamento</h1>
              <p className="text-muted-foreground">
                Organize suas matérias, registre sessões e acompanhe seu ritmo de estudos
              </p>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {/* Card Matérias */}
            <div className="rounded-xl border bg-card p-6 flex flex-col">
              <div className="flex items-center gap-3 mb-2">
                <div className="rounded-lg bg-primary/10 p-2">
                  <BookOpen className="h-5 w-5 text-primary" />
                </div>
                <h2 className="text-lg font-semibold">Matérias</h2>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                Cadastre e gerencie as matérias do seu ciclo de estudos.
              </p>
              <div className="mt-auto">
                <Button asChild>
                  <Link href="/planner/subjects">Gerenciar matérias</Link>
                </Button>
              </div>
            </div>

            {/* Card Sessões de Estudo */}
            <div className="rounded-xl border bg-card p-6 flex flex-col">
              <div className="flex items-center gap-3 mb-2">
                <div className="rounded-lg bg-primary/10 p-2">
                  <Files className="h-5 w-5 text-primary" />
                </div>
                <h2 className="text-lg font-semibold">Sessões de Estudo</h2>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                Registre suas sessões com duração, matéria e anotações.
              </p>
              <div className="mt-auto">
                <Button asChild variant="outline">
                  <Link href="/planner/sessions">Registrar sessões</Link>
                </Button>
              </div>
            </div>

            {/* Card Pomodoro */}
            <div className="rounded-xl border bg-card p-6 flex flex-col">
              <div className="flex items-center gap-3 mb-2">
                <div className="rounded-lg bg-primary/10 p-2">
                  <Timer className="h-5 w-5 text-primary" />
                </div>
                <h2 className="text-lg font-semibold">Pomodoro</h2>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                Use o timer Pomodoro para manter o foco e registrar sessões.
              </p>
              <div className="mt-auto">
                <Button asChild variant="secondary">
                  <Link href="/planner/pomodoro">Abrir Pomodoro</Link>
                </Button>
              </div>
            </div>
          </div>
      </div>
    </>
  )
}
