import { ComingSoon } from "@/components/coming-soon"

export default function SettingsPreferencesPage() {
  return (
    <ComingSoon
      title="Preferências"
      description="Personalize suas preferências de notificações, tema e outras configurações."
      breadcrumbs={[
        { label: "Configurações", href: "/settings" },
        { label: "Preferências" },
      ]}
    />
  )
}
