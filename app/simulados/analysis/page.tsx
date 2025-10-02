import { ComingSoon } from "@/components/coming-soon"

export default function SimuladosAnalysisPage() {
  return (
    <ComingSoon
      title="Análise de Simulados"
      description="Análise detalhada do seu desempenho nos simulados com insights e recomendações."
      breadcrumbs={[
        { label: "Simulados", href: "/simulados" },
        { label: "Análise" },
      ]}
    />
  )
}
