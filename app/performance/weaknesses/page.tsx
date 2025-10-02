import { ComingSoon } from "@/components/coming-soon"

export default function PerformanceWeaknessesPage() {
  return (
    <ComingSoon
      title="Pontos Fracos"
      description="Identifique seus pontos fracos e receba recomendações personalizadas de estudo."
      breadcrumbs={[
        { label: "Desempenho", href: "/performance" },
        { label: "Pontos Fracos" },
      ]}
    />
  )
}
