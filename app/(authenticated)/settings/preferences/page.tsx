import { PageHeader } from "@/components/page-header"
import { Bell, Sun, Globe } from "lucide-react"
import { Button } from "@/components/ui/button"

export default async function SettingsPreferencesPage() {
  return (
    <>
      <PageHeader
        breadcrumbs={[
          { label: "Configurações" },
          { label: "Preferências" },
        ]}
      />
      <div className="flex flex-1 flex-col gap-4 p-4 pt-6">
        <div className="max-w-2xl">
          <div className="rounded-xl border bg-card p-6">
            <h2 className="text-2xl font-bold mb-6">Preferências</h2>

            <div className="space-y-6">
              <div>
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <Sun className="h-4 w-4" />
                  Aparência
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 rounded-lg border">
                    <div>
                      <p className="font-medium">Tema</p>
                      <p className="text-sm text-muted-foreground">
                        Escolha entre claro, escuro ou automático
                      </p>
                    </div>
                    <Button variant="outline" size="sm" disabled>
                      Sistema
                    </Button>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <Bell className="h-4 w-4" />
                  Notificações
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 rounded-lg border">
                    <div>
                      <p className="font-medium">Lembretes de Estudo</p>
                      <p className="text-sm text-muted-foreground">
                        Receba lembretes para manter sua rotina
                      </p>
                    </div>
                    <Button variant="outline" size="sm" disabled>
                      Ativado
                    </Button>
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-lg border">
                    <div>
                      <p className="font-medium">Notificações de Metas</p>
                      <p className="text-sm text-muted-foreground">
                        Alertas sobre progresso das metas
                      </p>
                    </div>
                    <Button variant="outline" size="sm" disabled>
                      Ativado
                    </Button>
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-lg border">
                    <div>
                      <p className="font-medium">Email Semanal</p>
                      <p className="text-sm text-muted-foreground">
                        Resumo semanal do seu desempenho
                      </p>
                    </div>
                    <Button variant="outline" size="sm" disabled>
                      Desativado
                    </Button>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <Globe className="h-4 w-4" />
                  Idioma e Região
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 rounded-lg border">
                    <div>
                      <p className="font-medium">Idioma</p>
                      <p className="text-sm text-muted-foreground">
                        Idioma da interface
                      </p>
                    </div>
                    <Button variant="outline" size="sm" disabled>
                      Português (BR)
                    </Button>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t">
                <Button disabled>
                  Salvar Preferências
                </Button>
                <p className="text-xs text-muted-foreground mt-2">
                  Em breve: Personalização completa de preferências
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
