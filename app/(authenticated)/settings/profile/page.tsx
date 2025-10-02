import { getCurrentUser } from "@/app/actions/auth"
import { redirect } from "next/navigation"
import { PageLayout } from "@/components/page-layout"
import { User, Mail, Camera } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default async function SettingsProfilePage() {
  const user = await getCurrentUser()
  
  if (!user) {
    redirect('/login')
  }

  const userData = {
    name: user.full_name,
    email: user.email,
    avatar: user.avatar_url,
  }

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }

  return (
    <PageLayout
      user={userData}
      breadcrumbs={[
        { label: "Configurações" },
        { label: "Perfil" },
      ]}
    >
      <div className="max-w-2xl">
        <div className="rounded-xl border bg-card p-6">
          <h2 className="text-2xl font-bold mb-6">Perfil do Usuário</h2>

          <div className="space-y-6">
            <div className="flex items-center gap-6">
              <Avatar className="h-20 w-20">
                <AvatarImage src={userData.avatar} alt={userData.name} />
                <AvatarFallback className="text-lg">
                  {getInitials(userData.name)}
                </AvatarFallback>
              </Avatar>
              <div>
                <Button variant="outline" size="sm" disabled>
                  <Camera className="h-4 w-4 mr-2" />
                  Alterar Foto
                </Button>
                <p className="text-xs text-muted-foreground mt-2">
                  Em breve: Upload de foto de perfil
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">
                  <User className="h-4 w-4 inline mr-2" />
                  Nome Completo
                </label>
                <Input
                  type="text"
                  defaultValue={userData.name}
                  disabled
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Em breve: Edição de nome
                </p>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">
                  <Mail className="h-4 w-4 inline mr-2" />
                  Email
                </label>
                <Input
                  type="email"
                  defaultValue={userData.email}
                  disabled
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Email não pode ser alterado
                </p>
              </div>
            </div>

            <div className="pt-4 border-t">
              <Button disabled>
                Salvar Alterações
              </Button>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  )
}
