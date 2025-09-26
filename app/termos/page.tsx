import Link from "next/link"
import { ArrowLeft, FileText, Shield, AlertTriangle, Scale } from "lucide-react"

export default function TermosPage() {
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
                <FileText className="size-5 text-primary" />
              </div>
              <div>
                <h1 className="text-2xl font-bold tracking-tight">Termos e Condições</h1>
                <p className="text-sm text-muted-foreground">Última atualização: {new Date().toLocaleDateString('pt-BR')}</p>
              </div>
            </div>
          </div>

          <div className="p-6 space-y-8">
            <div className="rounded-lg border bg-muted/30 p-4">
              <div className="flex items-start gap-3">
                <AlertTriangle className="size-5 text-amber-500 mt-0.5 flex-shrink-0" />
                <div className="text-sm">
                  <p className="font-medium mb-1">Importante</p>
                  <p className="text-muted-foreground">
                    Ao adquirir e utilizar nossos produtos digitais, você concorda com os termos descritos abaixo.
                  </p>
                </div>
              </div>
            </div>

            <section className="space-y-4">
              <div className="flex items-center gap-2">
                <Scale className="size-5 text-primary" />
                <h2 className="text-xl font-semibold">1. Aceitação dos Termos</h2>
              </div>
              <div className="pl-7 space-y-3 text-sm text-muted-foreground leading-relaxed">
                <p>
                  Ao acessar e utilizar os produtos digitais oferecidos por David Simer, você concorda em cumprir e estar vinculado a estes Termos e Condições de Uso.
                </p>
                <p>
                  Se você não concordar com qualquer parte destes termos, não deve utilizar nossos produtos ou serviços.
                </p>
              </div>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-semibold">2. Produtos Digitais</h2>
              <div className="pl-4 space-y-3 text-sm text-muted-foreground leading-relaxed">
                <p>
                  Nossos produtos digitais incluem e-books, cursos online, materiais educacionais e conteúdos relacionados ao desenvolvimento pessoal e profissional.
                </p>
                <p>
                  Todo o conteúdo é protegido por direitos autorais e destinado exclusivamente ao uso pessoal do comprador.
                </p>
              </div>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-semibold">3. Licença de Uso</h2>
              <div className="pl-4 space-y-3 text-sm text-muted-foreground leading-relaxed">
                <p>
                  Concedemos a você uma licença não exclusiva, não transferível e revogável para usar nossos produtos digitais para fins pessoais e educacionais.
                </p>
                <p>
                  É expressamente proibido:
                </p>
                <ul className="list-disc list-inside ml-4 space-y-1">
                  <li>Reproduzir, distribuir ou compartilhar o conteúdo</li>
                  <li>Criar obras derivadas baseadas no material</li>
                  <li>Usar o conteúdo para fins comerciais sem autorização</li>
                  <li>Remover marcas d'água ou avisos de direitos autorais</li>
                </ul>
              </div>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-semibold">4. Política de Reembolso</h2>
              <div className="pl-4 space-y-3 text-sm text-muted-foreground leading-relaxed">
                <p>
                  Oferecemos garantia de satisfação de 7 dias a partir da data de compra. Se você não estiver satisfeito com o produto, pode solicitar reembolso integral.
                </p>
                <p>
                  Para solicitar reembolso, entre em contato através dos canais oficiais de atendimento.
                </p>
              </div>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-semibold">5. Propriedade Intelectual</h2>
              <div className="pl-4 space-y-3 text-sm text-muted-foreground leading-relaxed">
                <p>
                  Todo o conteúdo, incluindo textos, imagens, vídeos, áudios e materiais gráficos, é propriedade exclusiva de David Simer ou de seus licenciadores.
                </p>
                <p>
                  A violação dos direitos de propriedade intelectual pode resultar em ações legais cabíveis.
                </p>
              </div>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-semibold">6. Limitação de Responsabilidade</h2>
              <div className="pl-4 space-y-3 text-sm text-muted-foreground leading-relaxed">
                <p>
                  Os produtos são fornecidos "como estão" e não garantimos resultados específicos. O uso das informações é de responsabilidade exclusiva do usuário.
                </p>
                <p>
                  Não nos responsabilizamos por danos diretos, indiretos, incidentais ou consequenciais decorrentes do uso dos produtos.
                </p>
              </div>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-semibold">7. Modificações dos Termos</h2>
              <div className="pl-4 space-y-3 text-sm text-muted-foreground leading-relaxed">
                <p>
                  Reservamos o direito de modificar estes termos a qualquer momento. As alterações entrarão em vigor imediatamente após a publicação.
                </p>
                <p>
                  É responsabilidade do usuário verificar periodicamente os termos atualizados.
                </p>
              </div>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-semibold">8. Lei Aplicável</h2>
              <div className="pl-4 space-y-3 text-sm text-muted-foreground leading-relaxed">
                <p>
                  Estes termos são regidos pelas leis brasileiras. Qualquer disputa será resolvida no foro da comarca de residência do autor.
                </p>
              </div>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-semibold">9. Contato</h2>
              <div className="pl-4 space-y-3 text-sm text-muted-foreground leading-relaxed">
                <p>
                  Para dúvidas sobre estes termos, entre em contato através dos canais oficiais de atendimento disponibilizados em nossos produtos.
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