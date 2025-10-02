import { ComingSoon } from "@/components/coming-soon"

export default function PerformanceSubjectsPage() {
  return (
    <ComingSoon
      title="Desempenho por Matéria"
      description="Análise detalhada do seu desempenho em cada matéria estudada."
      breadcrumbs={[
        { label: "Desempenho", href: "/performance" },
        { label: "Por Matéria" },
      ]}
    />
  )
}
