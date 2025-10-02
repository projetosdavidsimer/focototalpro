import { BookOpen, BarChart3 } from "lucide-react"
import { PageHeader } from "@/components/page-header"
import Link from "next/link"

export default async function PerformanceSubjectsPage() {
  return (
    <>
      <PageHeader
        breadcrumbs={[
          { label: "Desempenho", href: "/performance" },
          { label: "Por Matéria" },
        ]}
      />
      <div className="flex flex-1 flex-col gap-4 p-4 pt-6">
        <div className="rounded-xl border bg-card p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold">Desempenho por Matéria</h2>
              <p className="text-sm text-muted-foreground mt-1">
                Acompanhe seu progresso em cada matéria individualmente
              </p>
            </div>
            <BookOpen className="h-8 w-8 text-muted-foreground" />
          </div>

          <div className="text-center py-12 text-muted-foreground">
            <BarChart3 className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p className="text-lg font-medium mb-2">Nenhuma matéria cadastrada</p>
            <p className="text-sm">
              Cadastre suas matérias em <Link href="/planner/subjects" className="text-primary hover:underline">Planejamento → Minhas Matérias</Link> para acompanhar seu desempenho.
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
