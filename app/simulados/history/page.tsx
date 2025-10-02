import { ComingSoon } from "@/components/coming-soon"

export default function SimuladosHistoryPage() {
  return (
    <ComingSoon
      title="Histórico de Simulados"
      description="Acesse o histórico completo de todos os seus simulados realizados."
      breadcrumbs={[
        { label: "Simulados", href: "/simulados" },
        { label: "Histórico" },
      ]}
    />
  )
}
