import { Target, TrendingUp, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { PageHeader } from "@/components/page-header"

export default async function GoalsPage() {
  return (
    <>
      <PageHeader breadcrumbs={[{ label: "Metas do Mês" }]} />
      <div className="flex flex-1 flex-col gap-4 p-4 pt-6">
        <div className="rounded-xl border bg-card p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold">Metas do Mês</h2>
              <p className="text-sm text-muted-foreground mt-1">
                Defina e acompanhe suas metas mensais de estudo
              </p>
            </div>
            <Target className="h-8 w-8 text-muted-foreground" />
          </div>

          <div className="grid gap-4 md:grid-cols-3 mb-6">
            <div className="p-4 rounded-lg border">
              <div className="flex items-center gap-2 mb-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <h3 className="text-sm font-medium text-muted-foreground">Horas Meta</h3>
              </div>
              <p className="text-2xl font-bold">0h</p>
              <p className="text-xs text-muted-foreground mt-1">Definir meta</p>
            </div>

            <div className="p-4 rounded-lg border">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
                <h3 className="text-sm font-medium text-muted-foreground">Progresso</h3>
              </div>
              <p className="text-2xl font-bold">0%</p>
              <p className="text-xs text-muted-foreground mt-1">Da meta mensal</p>
            </div>

            <div className="p-4 rounded-lg border">
              <div className="flex items-center gap-2 mb-2">
                <Target className="h-4 w-4 text-muted-foreground" />
                <h3 className="text-sm font-medium text-muted-foreground">Simulados</h3>
              </div>
              <p className="text-2xl font-bold">0</p>
              <p className="text-xs text-muted-foreground mt-1">Este mês</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="p-4 rounded-lg border bg-muted/50">
              <h3 className="font-medium mb-2">Como funciona?</h3>
              <p className="text-sm text-muted-foreground">
                Defina metas mensais de horas de estudo, simulados e desempenho. Acompanhe seu progresso e receba notificações para manter o foco.
              </p>
            </div>

            <div className="text-center py-8">
              <Button disabled>
                <Target className="h-4 w-4 mr-2" />
                Definir Metas do Mês
              </Button>
              <p className="text-xs text-muted-foreground mt-2">
                Em breve: Sistema completo de metas e acompanhamento
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
