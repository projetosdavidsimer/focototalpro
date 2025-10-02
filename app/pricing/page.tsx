import { Crown, Check, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default async function PricingPage() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="text-xl font-bold">
            FocoTotal
          </Link>
          <Link href="/login">
            <Button variant="outline">Entrar</Button>
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">Escolha seu Plano</h1>
            <p className="text-muted-foreground">
              Desbloqueie todo o potencial do FocoTotal
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Plano Gratuito */}
            <div className="rounded-xl border bg-card p-6">
              <div className="mb-6">
                <h3 className="text-xl font-bold mb-2">Plano Gratuito</h3>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold">R$ 0</span>
                  <span className="text-muted-foreground">/mês</span>
                </div>
              </div>

              <ul className="space-y-3 mb-6">
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-primary" />
                  <span className="text-sm">Dashboard básico</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-primary" />
                  <span className="text-sm">Até 5 matérias</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-primary" />
                  <span className="text-sm">Registro de sessões</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-primary" />
                  <span className="text-sm">Timer Pomodoro</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-primary" />
                  <span className="text-sm">Registro de simulados</span>
                </li>
              </ul>

              <Link href="/register">
                <Button variant="outline" className="w-full">
                  Começar Grátis
                </Button>
              </Link>
            </div>

            {/* Plano Premium */}
            <div className="rounded-xl border-2 border-primary bg-card p-6 relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <span className="bg-primary text-primary-foreground text-xs font-semibold px-3 py-1 rounded-full">
                  RECOMENDADO
                </span>
              </div>

              <div className="mb-6">
                <div className="flex items-center gap-2 mb-2">
                  <Crown className="h-5 w-5 text-primary" />
                  <h3 className="text-xl font-bold">Plano Premium</h3>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold">R$ 29,90</span>
                  <span className="text-muted-foreground">/mês</span>
                </div>
              </div>

              <ul className="space-y-3 mb-6">
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium">Tudo do plano gratuito</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-primary" />
                  <span className="text-sm">Matérias ilimitadas</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-primary" />
                  <span className="text-sm">Análises avançadas</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-primary" />
                  <span className="text-sm">Gráficos detalhados</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-primary" />
                  <span className="text-sm">Identificação de pontos fracos</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-primary" />
                  <span className="text-sm">Relatórios personalizados</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-primary" />
                  <span className="text-sm">Metas avançadas</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-primary" />
                  <span className="text-sm">Suporte prioritário</span>
                </li>
              </ul>

              <Button className="w-full" disabled>
                <Sparkles className="h-4 w-4 mr-2" />
                Fazer Upgrade
              </Button>
              <p className="text-xs text-muted-foreground text-center mt-2">
                Em breve: Integração com Stripe
              </p>
            </div>
          </div>

          <div className="mt-8 p-6 rounded-xl border bg-muted/50">
            <h3 className="font-semibold mb-2">Garantia de 7 dias</h3>
            <p className="text-sm text-muted-foreground">
              Experimente o Plano Premium sem riscos. Se não ficar satisfeito, devolvemos seu dinheiro em até 7 dias.
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}
