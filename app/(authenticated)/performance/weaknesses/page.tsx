import { AlertCircle, Target } from "lucide-react"
import { PageHeader } from "@/components/page-header"

export default async function PerformanceWeaknessesPage() {
  return (
    <>
      <PageHeader
        breadcrumbs={[
          { label: "Desempenho", href: "/performance" },
          { label: "Pontos Fracos" },
        ]}
      />
      <div className="flex flex-1 flex-col gap-4 p-4 pt-6">
        <div className="rounded-xl border bg-card p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold">Pontos Fracos</h2>
              <p className="text-sm text-muted-foreground mt-1">
                Identifique áreas que precisam de mais atenção nos seus estudos
              </p>
            </div>
            <AlertCircle className="h-8 w-8 text-muted-foreground" />
          </div>

          <div className="space-y-4">
            <div className="p-4 rounded-lg border bg-muted/50">
              <h3 className="font-medium mb-2">Como funciona?</h3>
              <p className="text-sm text-muted-foreground">
                Analisamos seu desempenho em simulados e sessões de estudo para identificar automaticamente as matérias e tópicos que precisam de mais atenção.
              </p>
            </div>

            <div className="text-center py-12 text-muted-foreground">
              <Target className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p className="text-lg font-medium mb-2">Análise em desenvolvimento</p>
              <p className="text-sm">
                Continue estudando e registrando simulados. Em breve você terá acesso a uma análise detalhada dos seus pontos fracos.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
