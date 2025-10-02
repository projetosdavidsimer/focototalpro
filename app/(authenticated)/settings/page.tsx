import { redirect } from "next/navigation"

export default function SettingsPage() {
  // Redireciona para a página de perfil por padrão
  redirect('/settings/profile')
}
