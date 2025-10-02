import { ComingSoon } from "@/components/coming-soon"

export default function SettingsProfilePage() {
  return (
    <ComingSoon
      title="Editar Perfil"
      description="Atualize suas informações pessoais, foto de perfil e dados de contato."
      breadcrumbs={[
        { label: "Configurações", href: "/settings" },
        { label: "Perfil" },
      ]}
    />
  )
}
