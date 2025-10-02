import { ComingSoon } from "@/components/coming-soon"

export default function SettingsPage() {
  return (
    <ComingSoon
      title="Perfil"
      description="Gerencie suas informações pessoais e preferências de conta."
      breadcrumbs={[
        { label: "Configurações" },
      ]}
    />
  )
}
