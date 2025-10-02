import { getCurrentUser } from "@/app/actions/auth"
import { redirect } from "next/navigation"
import { PageLayout } from "@/components/page-layout"
import { TrendingUp, Clock, Target, Award } from "lucide-react"

export default async function PerformancePage() {
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
        { label: "Desempenho" },
        { label: "Evolução Geral" },
      ]}
    >
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl border bg-card p-6">
          <div className="flex items-center gap-2 mb-2">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <h3 className="text-sm font-medium text-muted-foreground">Horas Estudadas</h3>
          </div>
          <p className="text-2xl font-bold">0h</p>
          <p className="text-xs text-muted-foreground mt-1">Este mês</p>
        </div>

        <div className="rounded-xl border bg-card p-6">
          <div className="flex items-center gap-2 mb-2">
            <Target className="h-4 w-4 text-muted-foreground" />
            <h3 className="text-sm font-medium text-muted-foreground">Meta Mensal</h3>
          </div>
          <p className="text-2xl font-bold">0%</p>
          <p className="text-xs text-muted-foreground mt-1">Progresso</p>
        </div>

        <div className="rounded-xl border bg-card p-6">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
            <h3 className="text-sm font-medium text-muted-foreground">Desempenho</h3>
          </div>
          <p className="text-2xl font-bold">0%</p>
          <p className="text-xs text-muted-foreground mt-1">Média geral</p>
        </div>

        <div className="rounded-xl border bg-card p-6">
          <div className="flex items-center gap-2 mb-2">
            <Award className="h-4 w-4 text-muted-foreground" />
            <h3 className="text-sm font-medium text-muted-foreground">Sequência</h3>
          </div>
          <p className="text-2xl font-bold">0 dias</p>
          <p className="text-xs text-muted-foreground mt-1">Estudando</p>
        </div>
      </div>

      <div className="rounded-xl border bg-card p-6">
        <h2 className="text-lg font-semibold mb-4">Evolução Geral</h2>
        <div className="text-center py-12 text-muted-foreground">
          <TrendingUp className="h-12 w-12 mx-auto mb-4 opacity-50" />
          <p className="text-lg font-medium mb-2">Comece a estudar para ver sua evolução</p>
          <p className="text-sm">
            Registre suas sessões de estudo e simulados para acompanhar seu progresso ao longo do tempo.
          </p>
        </div>
      </div>
    </PageLayout>
  )
}
