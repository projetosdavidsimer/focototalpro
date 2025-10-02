import { PageHeader } from "@/components/page-header"
import { CreditCard, Crown, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"

export default async function SettingsSubscriptionPage() {
  return (
    <>
      <PageHeader
        breadcrumbs={[
          { label: "Configurações" },
          { label: "Assinatura" },
        ]}
      />
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <div className="max-w-2xl">
          <div className="rounded-xl border bg-card p-6">
            <h2 className="text-2xl font-bold mb-6">Gerenciar Assinatura</h2>

            <div className="space-y-6">
              <div className="p-4 rounded-lg border bg-muted/50">
                <div className="flex items-center gap-3 mb-3">
                  <Crown className="h-5 w-5 text-primary" />
                  <h3 className="font-semibold">Plano Atual</h3>
                </div>
                <p className="text-2xl font-bold mb-1">Plano Gratuito</p>
                <p className="text-sm text-muted-foreground">
                  Acesso a funcionalidades básicas
                </p>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 rounded-lg border">
                  <Calendar className="h-5 w-5 text-muted-foreground" />
                  <div className="flex-1">
                    <p className="font-medium">Data de Renovação</p>
                    <p className="text-sm text-muted-foreground">-</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-lg border">
                  <CreditCard className="h-5 w-5 text-muted-foreground" />
                  <div className="flex-1">
                    <p className="font-medium">Método de Pagamento</p>
                    <p className="text-sm text-muted-foreground">Nenhum cadastrado</p>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t">
                <Button className="w-full" disabled>
                  <Crown className="h-4 w-4 mr-2" />
                  Fazer Upgrade para Premium
                </Button>
                <p className="text-xs text-muted-foreground text-center mt-2">
                  Em breve: Integração com Stripe para pagamentos
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-xl border bg-card p-6 mt-4">
            <h3 className="font-semibold mb-4">Plano Premium</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                Acesso ilimitado a todas as funcionalidades
              </li>
              <li className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                Análises avançadas de desempenho
              </li>
              <li className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                Relatórios personalizados
              </li>
              <li className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                Suporte prioritário
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  )
}
