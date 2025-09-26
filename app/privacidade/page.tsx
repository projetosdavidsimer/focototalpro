import Link from "next/link"
import { ArrowLeft, Shield, Eye, Lock, Database, UserCheck, AlertTriangle } from "lucide-react"

export default function PrivacidadePage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-4xl px-4 py-8">
        <div className="mb-8">
          <Link 
            href="/landing" 
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="size-4" />
            Voltar para a página inicial
          </Link>
        </div>

        <div className="rounded-xl border bg-card shadow-sm">
          <div className="border-b bg-muted/50 px-6 py-4">
            <div className="flex items-center gap-3">
              <div className="size-10 rounded-lg border bg-background grid place-items-center">
                <Shield className="size-5 text-primary" />
              </div>
              <div>
                <h1 className="text-2xl font-bold tracking-tight">Política de Privacidade</h1>
                <p className="text-sm text-muted-foreground">Última atualização: {new Date().toLocaleDateString('pt-BR')}</p>
              </div>
            </div>
          </div>

          <div className="p-6 space-y-8">
            <div className="rounded-lg border bg-muted/30 p-4">
              <div className="flex items-start gap-3">
                <Lock className="size-5 text-green-500 mt-0.5 flex-shrink-0" />
                <div className="text-sm">
                  <p className="font-medium mb-1">Compromisso com sua Privacidade</p>
                  <p className="text-muted-foreground">
                    David Simer está comprometido em proteger e respeitar sua privacidade. Esta política explica como coletamos, usamos e protegemos suas informações.
                  </p>
                </div>
              </div>
            </div>

            <section className="space-y-4">
              <div className="flex items-center gap-2">
                <Database className="size-5 text-primary" />
                <h2 className="text-xl font-semibold">1. Informações que Coletamos</h2>
              </div>
              <div className="pl-7 space-y-4">
                <div>
                  <h3 className="font-medium text-sm mb-2">Informações Pessoais</h3>
                  <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside ml-4">
                    <li>Nome completo</li>
                    <li>Endereço de e-mail</li>
                    <li>Informações de pagamento (processadas por terceiros seguros)</li>
                    <li>Dados de contato fornecidos voluntariamente</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-medium text-sm mb-2">Informações Técnicas</h3>
                  <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside ml-4">
                    <li>Endereço IP</li>
                    <li>Tipo de navegador e dispositivo</li>
                    <li>Páginas visitadas e tempo de permanência</li>
                    <li>Cookies e tecnologias similares</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="space-y-4">
              <div className="flex items-center gap-2">
                <Eye className="size-5 text-primary" />
                <h2 className="text-xl font-semibold">2. Como Usamos suas Informações</h2>
              </div>
              <div className="pl-7 space-y-3 text-sm text-muted-foreground leading-relaxed">
                <p>Utilizamos suas informações para:</p>
                <ul className="list-disc list-inside ml-4 space-y-1">
                  <li>Processar e entregar seus pedidos</li>
                  <li>Fornecer suporte ao cliente</li>
                  <li>Enviar atualizações sobre produtos e serviços</li>
                  <li>Melhorar nossos produtos e experiência do usuário</li>
                  <li>Cumprir obrigações legais e regulamentares</li>
                  <li>Prevenir fraudes e garantir segurança</li>
                </ul>
              </div>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-semibold">3. Base Legal para Processamento</h2>
              <div className="pl-4 space-y-3 text-sm text-muted-foreground leading-relaxed">
                <p>Processamos seus dados com base em:</p>
                <ul className="list-disc list-inside ml-4 space-y-1">
                  <li><strong>Consentimento:</strong> Quando você nos fornece permissão explícita</li>
                  <li><strong>Execução contratual:</strong> Para cumprir obrigações de venda e entrega</li>
                  <li><strong>Interesse legítimo:</strong> Para melhorar nossos serviços e prevenir fraudes</li>
                  <li><strong>Obrigação legal:</strong> Para cumprir requisitos legais aplicáveis</li>
                </ul>
              </div>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-semibold">4. Compartilhamento de Informações</h2>
              <div className="pl-4 space-y-3 text-sm text-muted-foreground leading-relaxed">
                <p>Não vendemos suas informações pessoais. Podemos compartilhar dados apenas com:</p>
                <ul className="list-disc list-inside ml-4 space-y-1">
                  <li><strong>Processadores de pagamento:</strong> Para processar transações com segurança</li>
                  <li><strong>Provedores de serviços:</strong> Que nos ajudam a operar nosso negócio</li>
                  <li><strong>Autoridades legais:</strong> Quando exigido por lei</li>
                </ul>
                <p className="mt-3">
                  Todos os terceiros são obrigados a manter a confidencialidade de suas informações.
                </p>
              </div>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-semibold">5. Segurança dos Dados</h2>
              <div className="pl-4 space-y-3 text-sm text-muted-foreground leading-relaxed">
                <p>
                  Implementamos medidas técnicas e organizacionais apropriadas para proteger suas informações contra acesso não autorizado, alteração, divulgação ou destruição.
                </p>
                <p>
                  Isso inclui criptografia, controles de acesso, monitoramento de segurança e treinamento de equipe.
                </p>
              </div>
            </section>

            <section className="space-y-4">
              <div className="flex items-center gap-2">
                <UserCheck className="size-5 text-primary" />
                <h2 className="text-xl font-semibold">6. Seus Direitos</h2>
              </div>
              <div className="pl-7 space-y-3 text-sm text-muted-foreground leading-relaxed">
                <p>Você tem o direito de:</p>
                <ul className="list-disc list-inside ml-4 space-y-1">
                  <li><strong>Acesso:</strong> Solicitar cópia dos dados que temos sobre você</li>
                  <li><strong>Retificação:</strong> Corrigir informações incorretas ou incompletas</li>
                  <li><strong>Exclusão:</strong> Solicitar a remoção de seus dados pessoais</li>
                  <li><strong>Portabilidade:</strong> Receber seus dados em formato estruturado</li>
                  <li><strong>Oposição:</strong> Opor-se ao processamento de seus dados</li>
                  <li><strong>Limitação:</strong> Restringir o processamento em certas circunstâncias</li>
                </ul>
                <p className="mt-3">
                  Para exercer esses direitos, entre em contato através dos canais oficiais.
                </p>
              </div>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-semibold">7. Cookies e Tecnologias Similares</h2>
              <div className="pl-4 space-y-3 text-sm text-muted-foreground leading-relaxed">
                <p>
                  Utilizamos cookies para melhorar sua experiência, analisar o uso do site e personalizar conteúdo.
                </p>
                <p>
                  Você pode controlar o uso de cookies através das configurações do seu navegador.
                </p>
              </div>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-semibold">8. Retenção de Dados</h2>
              <div className="pl-4 space-y-3 text-sm text-muted-foreground leading-relaxed">
                <p>
                  Mantemos suas informações apenas pelo tempo necessário para cumprir as finalidades descritas nesta política ou conforme exigido por lei.
                </p>
                <p>
                  Dados de transações podem ser mantidos por períodos mais longos para fins contábeis e legais.
                </p>
              </div>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-semibold">9. Transferências Internacionais</h2>
              <div className="pl-4 space-y-3 text-sm text-muted-foreground leading-relaxed">
                <p>
                  Alguns de nossos provedores de serviços podem estar localizados fora do Brasil. Garantimos que essas transferências atendam aos padrões de proteção adequados.
                </p>
              </div>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-semibold">10. Alterações nesta Política</h2>
              <div className="pl-4 space-y-3 text-sm text-muted-foreground leading-relaxed">
                <p>
                  Podemos atualizar esta política periodicamente. Notificaremos sobre mudanças significativas através de e-mail ou aviso em nosso site.
                </p>
              </div>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-semibold">11. Contato</h2>
              <div className="pl-4 space-y-3 text-sm text-muted-foreground leading-relaxed">
                <p>
                  Para questões sobre privacidade ou para exercer seus direitos, entre em contato através dos canais oficiais disponibilizados em nossos produtos.
                </p>
              </div>
            </section>
          </div>
        </div>

        <div className="mt-8 text-center">
          <Link 
            href="/landing" 
            className="inline-flex items-center gap-2 rounded border bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm hover:brightness-110 transition-all"
          >
            <ArrowLeft className="size-4" />
            Voltar para a página inicial
          </Link>
        </div>
      </div>
    </div>
  )
}