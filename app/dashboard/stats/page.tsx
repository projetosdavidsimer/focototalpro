import { ComingSoon } from "@/components/coming-soon"

export default function DashboardStatsPage() {
  return (
    <ComingSoon
      title="Estatísticas Detalhadas"
      description="Visualize estatísticas avançadas sobre seu desempenho e progresso nos estudos."
      breadcrumbs={[
        { label: "Dashboard", href: "/dashboard" },
        { label: "Estatísticas" },
      ]}
    />
  )
}
