import { ComingSoon } from "@/components/coming-soon"

export default function SessionsPage() {
  return (
    <ComingSoon
      title="Sessões de Estudo"
      description="Visualize e gerencie todas as suas sessões de estudo registradas."
      breadcrumbs={[
        { label: "Sessões de Estudo" },
      ]}
    />
  )
}
