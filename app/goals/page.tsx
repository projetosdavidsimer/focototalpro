import { ComingSoon } from "@/components/coming-soon"

export default function GoalsPage() {
  return (
    <ComingSoon
      title="Metas do Mês"
      description="Defina e acompanhe suas metas mensais de estudo e desempenho."
      breadcrumbs={[
        { label: "Metas do Mês" },
      ]}
    />
  )
}
