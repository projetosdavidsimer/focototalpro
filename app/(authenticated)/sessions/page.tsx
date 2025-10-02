import { Clock, Calendar, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { PageHeader } from "@/components/page-header"
import Link from "next/link"

export default async function SessionsPage() {
  return (
    <>
      <PageHeader breadcrumbs={[{ label: "Sessões de Estudo" }]} />
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <div className="rounded-xl border bg-card p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold">Sessões de Estudo</h2>
              <p className="text-sm text-muted-foreground mt-1">
                Visualize e gerencie todas as suas sessões de estudo
              </p>
            </div>
            <Clock className="h-8 w-8 text-muted-foreground" />
          </div>

          <div className="grid gap-4 md:grid-cols-3 mb-6">
            <div className="p-4 rounded-lg border">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <h3 className="text-sm font-medium text-muted-foreground">Hoje</h3>
              </div>
              <p className="text-2xl font-bold">0h</p>
              <p className="text-xs text-muted-foreground mt-1">Horas estudadas</p>
            </div>

            <div className="p-4 rounded-lg border">
              <div className="flex items-center gap-2 mb-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <h3 className="text-sm font-medium text-muted-foreground">Esta Semana</h3>
              </div>
              <p className="text-2xl font-bold">0h</p>
              <p className="text-xs text-muted-foreground mt-1">Total semanal</p>
            </div>

            <div className="p-4 rounded-lg border">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
                <h3 className="text-sm font-medium text-muted-foreground">Média Diária</h3>
              </div>
              <p className="text-2xl font-bold">0h</p>
              <p className="text-xs text-muted-foreground mt-1">Últimos 7 dias</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 rounded-lg border">
              <div>
                <h3 className="font-medium">Registrar Nova Sessão</h3>
                <p className="text-sm text-muted-foreground">
                  Acesse o módulo de planejamento para registrar sessões
                </p>
              </div>
              <Button asChild>
                <Link href="/planner/sessions">
                  Ir para Sessões
                </Link>
              </Button>
            </div>

            <div className="text-center py-8 text-muted-foreground">
              <Clock className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p className="text-lg font-medium mb-2">Nenhuma sessão registrada</p>
              <p className="text-sm">
                Use o <Link href="/planner/pomodoro" className="text-primary hover:underline">Timer Pomodoro</Link> ou registre manualmente suas sessões de estudo.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
