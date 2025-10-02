import { PageHeader } from "@/components/page-header"
import { Calendar, TrendingUp } from "lucide-react"

export default async function SimuladosHistoryPage() {
  return (
    <>
      <PageHeader
        breadcrumbs={[
          { label: "Simulados", href: "/simulados" },
          { label: "Histórico" },
        ]}
      />
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <div className="rounded-xl border bg-card p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold">Histórico de Simulados</h2>
              <p className="text-sm text-muted-foreground mt-1">
                Visualize todos os simulados realizados ao longo do tempo
              </p>
            </div>
            <Calendar className="h-8 w-8 text-muted-foreground" />
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-4 p-4 rounded-lg border">
              <div className="flex-1">
                <h3 className="font-medium">Filtros</h3>
                <p className="text-sm text-muted-foreground">
                  Em breve: Filtrar por período, matéria e desempenho
                </p>
              </div>
            </div>

            <div className="text-center py-12 text-muted-foreground">
              <TrendingUp className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p className="text-lg font-medium mb-2">Nenhum simulado registrado</p>
              <p className="text-sm">
                Registre seus primeiros simulados para acompanhar seu histórico e evolução.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
