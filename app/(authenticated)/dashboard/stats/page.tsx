import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { ThemeToggle } from "@/components/theme-toggle"
import { BarChart3, TrendingUp, Clock, Target } from "lucide-react"

export default async function DashboardStatsPage() {
  return (
    <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Estatísticas</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          <div className="ml-auto px-4">
            <ThemeToggle />
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-xl border bg-card p-6">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <h3 className="text-sm font-medium text-muted-foreground">Total de Horas</h3>
              </div>
              <p className="text-2xl font-bold">0h</p>
              <p className="text-xs text-muted-foreground mt-1">Desde o início</p>
            </div>
            
            <div className="rounded-xl border bg-card p-6">
              <div className="flex items-center gap-2 mb-2">
                <Target className="h-4 w-4 text-muted-foreground" />
                <h3 className="text-sm font-medium text-muted-foreground">Simulados Realizados</h3>
              </div>
              <p className="text-2xl font-bold">0</p>
              <p className="text-xs text-muted-foreground mt-1">Total de simulados</p>
            </div>
            
            <div className="rounded-xl border bg-card p-6">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
                <h3 className="text-sm font-medium text-muted-foreground">Média Geral</h3>
              </div>
              <p className="text-2xl font-bold">0%</p>
              <p className="text-xs text-muted-foreground mt-1">Desempenho médio</p>
            </div>
            
            <div className="rounded-xl border bg-card p-6">
              <div className="flex items-center gap-2 mb-2">
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
                <h3 className="text-sm font-medium text-muted-foreground">Matérias Ativas</h3>
              </div>
              <p className="text-2xl font-bold">0</p>
              <p className="text-xs text-muted-foreground mt-1">Em estudo</p>
            </div>
          </div>

          <div className="rounded-xl border bg-card p-6">
            <h2 className="text-lg font-semibold mb-4">Estatísticas Detalhadas</h2>
            <div className="text-center py-12 text-muted-foreground">
              <BarChart3 className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>Comece a estudar e registrar simulados para ver suas estatísticas detalhadas aqui.</p>
            </div>
          </div>
        </div>
      </SidebarInset>
  )
}
