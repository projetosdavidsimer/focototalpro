import { ComingSoon } from "@/components/coming-soon"

export default function SettingsSubscriptionPage() {
  return (
    <ComingSoon
      title="Assinatura"
      description="Gerencie sua assinatura, plano e métodos de pagamento."
      breadcrumbs={[
        { label: "Configurações", href: "/settings" },
        { label: "Assinatura" },
      ]}
    />
  )
}
