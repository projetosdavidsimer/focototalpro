import { ComingSoon } from "@/components/coming-soon"

export default function PerformancePage() {
  return (
    <ComingSoon
      title="Evolução Geral"
      description="Acompanhe sua evolução geral nos estudos com gráficos e métricas detalhadas."
      breadcrumbs={[
        { label: "Desempenho" },
      ]}
    />
  )
}
