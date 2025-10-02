import { ComingSoon } from "@/components/coming-soon"

export default function PricingPage() {
  return (
    <ComingSoon
      title="Plano Premium"
      description="Conheça os benefícios do plano Premium e faça upgrade da sua conta."
      breadcrumbs={[
        { label: "Plano Premium" },
      ]}
    />
  )
}
