import { getCurrentUser } from "@/app/actions/auth"
import { redirect } from "next/navigation"
import { PageLayout } from "@/components/page-layout"
import { BarChart3, TrendingUp, Target } from "lucide-react"

export default async function SimuladosAnalysisPage() {
  const user = await getCurrentUser()
  
  if (!user) {
    redirect('/login')
  }

  const userData = {
    name: user.full_name,
    email: user.email,
    avatar: user.avatar_url,
  }

  return (
    <PageLayout
      user={userData}
      breadcrumbs={[
        { label: "Simulados", href: "/simulados" },
        { label: "Análise" },
      ]}
    >
      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-xl border bg-card p-6">
          <div className="flex items-center gap-2 mb-2">
            <Target className="h-4 w-4 text-muted-foreground" />
            <h3 className="text-sm font-medium text-muted-foreground">Taxa de Acerto</h3>
          </div>
          <p className="text-2xl font-bold">0%</p>
          <p className="text-xs text-muted-foreground mt-1">Média geral</p>
        </div>

        <div className="rounded-xl border bg-card p-6">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
            <h3 className="text-sm font-medium text-muted-foreground">Evolução</h3>
          </div>
          <p className="text-2xl font-bold">0%</p>
          <p className="text-xs text-muted-foreground mt-1">Últimos 30 dias</p>
        </div>

        <div className="rounded-xl border bg-card p-6">
          <div className="flex items-center gap-2 mb-2">
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
            <h3 className="text-sm font-medium text-muted-foreground">Total</h3>
          </div>
          <p className="text-2xl font-bold">0</p>
          <p className="text-xs text-muted-foreground mt-1">Simulados realizados</p>
        </div>
      </div>

      <div className="rounded-xl border bg-card p-6">
        <h2 className="text-lg font-semibold mb-4">Análise Detalhada</h2>
        <div className="text-center py-12 text-muted-foreground">
          <BarChart3 className="h-12 w-12 mx-auto mb-4 opacity-50" />
          <p className="text-lg font-medium mb-2">Análise em desenvolvimento</p>
          <p className="text-sm">
            Em breve você terá acesso a gráficos detalhados de evolução, análise por matéria e identificação de pontos fracos.
          </p>
        </div>
      </div>
    </PageLayout>
  )
}
