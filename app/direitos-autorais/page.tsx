import Link from "next/link"
import { ArrowLeft, Copyright, Shield, AlertTriangle, Scale, FileText, User } from "lucide-react"

export default function DireitosAutoraisPage() {
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
                <Copyright className="size-5 text-primary" />
              </div>
              <div>
                <h1 className="text-2xl font-bold tracking-tight">Direitos Autorais</h1>
                <p className="text-sm text-muted-foreground">Proteção de Propriedade Intelectual</p>
              </div>
            </div>
          </div>

          <div className="p-6 space-y-8">
            <div className="rounded-lg border bg-muted/30 p-4">
              <div className="flex items-start gap-3">
                <User className="size-5 text-blue-500 mt-0.5 flex-shrink-0" />
                <div className="text-sm">
                  <p className="font-medium mb-1">Autor e Proprietário</p>
                  <p className="text-muted-foreground">
                    Todo o conteúdo disponibilizado é de propriedade exclusiva de <strong>David Simer</strong>, protegido pelas leis de direitos autorais brasileiras e internacionais.
                  </p>
                </div>
              </div>
            </div>

            <section className="space-y-4">
              <div className="flex items-center gap-2">
                <Shield className="size-5 text-primary" />
                <h2 className="text-xl font-semibold">1. Propriedade do Conteúdo</h2>
              </div>
              <div className="pl-7 space-y-3 text-sm text-muted-foreground leading-relaxed">
                <p>
                  Todos os materiais disponibilizados, incluindo mas não limitado a:
                </p>
                <ul className="list-disc list-inside ml-4 space-y-1">
                  <li>E-books e publicações digitais</li>
                  <li>Cursos online e materiais educacionais</li>
                  <li>Vídeos, áudios e conteúdo multimídia</li>
                  <li>Textos, artigos e posts</li>
                  <li>Imagens, gráficos e ilustrações</li>
                  <li>Logotipos, marcas e identidade visual</li>
                  <li>Códigos, scripts e desenvolvimentos técnicos</li>
                </ul>
                <p>
                  São de propriedade exclusiva de David Simer e estão protegidos pelas leis de direitos autorais.
                </p>
              </div>
            </section>

            <section className="space-y-4">
              <div className="flex items-center gap-2">
                <FileText className="size-5 text-primary" />
                <h2 className="text-xl font-semibold">2. Registro e Proteção</h2>
              </div>
              <div className="pl-7 space-y-3 text-sm text-muted-foreground leading-relaxed">
                <p>
                  O conteúdo está protegido por:
                </p>
                <ul className="list-disc list-inside ml-4 space-y-1">
                  <li>Lei de Direitos Autorais (Lei 9.610/98)</li>
                  <li>Convenções internacionais de direitos autorais</li>
                  <li>Registros junto aos órgãos competentes quando aplicável</li>
                  <li>Marcas d'água e identificações digitais</li>
                </ul>
                <p>
                  Qualquer uso não autorizado constitui violação dos direitos autorais.
                </p>
              </div>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-semibold">3. Uso Autorizado</h2>
              <div className="pl-4 space-y-4">
                <div>
                  <h3 className="font-medium text-sm mb-2 text-green-600">Permitido:</h3>
                  <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside ml-4">
                    <li>Uso pessoal e educacional do conteúdo adquirido</li>
                    <li>Impressão para uso próprio</li>
                    <li>Backup pessoal dos materiais</li>
                    <li>Citações com devida atribuição (uso acadêmico)</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-medium text-sm mb-2 text-red-600">Proibido:</h3>
                  <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside ml-4">
                    <li>Reprodução, distribuição ou compartilhamento não autorizado</li>
                    <li>Venda, revenda ou comercialização do conteúdo</li>
                    <li>Modificação, adaptação ou criação de obras derivadas</li>
                    <li>Remoção de marcas d'água ou avisos de direitos autorais</li>
                    <li>Upload em plataformas de compartilhamento</li>
                    <li>Uso para treinamentos comerciais sem licença</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="space-y-4">
              <div className="flex items-center gap-2">
                <AlertTriangle className="size-5 text-amber-500" />
                <h2 className="text-xl font-semibold">4. Violações e Penalidades</h2>
              </div>
              <div className="pl-7 space-y-3 text-sm text-muted-foreground leading-relaxed">
                <p>
                  A violação dos direitos autorais pode resultar em:
                </p>
                <ul className="list-disc list-inside ml-4 space-y-1">
                  <li>Ações judiciais cíveis e criminais</li>
                  <li>Indenização por danos materiais e morais</li>
                  <li>Apreensão de material infrator</li>
                  <li>Multa de até 3.000 exemplares da obra</li>
                  <li>Prisão de 3 meses a 1 ano (crimes contra direitos autorais)</li>
                </ul>
                <p>
                  Monitoramos ativamente o uso não autorizado de nosso conteúdo.
                </p>
              </div>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-semibold">5. Licenciamento Comercial</h2>
              <div className="pl-4 space-y-3 text-sm text-muted-foreground leading-relaxed">
                <p>
                  Para uso comercial, corporativo ou educacional institucional, é necessário obter licença específica.
                </p>
                <p>
                  Entre em contato através dos canais oficiais para discutir termos de licenciamento.
                </p>
              </div>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-semibold">6. Marca e Identidade Visual</h2>
              <div className="pl-4 space-y-3 text-sm text-muted-foreground leading-relaxed">
                <p>
                  O nome "David Simer", logotipos, marcas e identidade visual são marcas registradas ou em processo de registro.
                </p>
                <p>
                  O uso não autorizado dessas marcas é expressamente proibido.
                </p>
              </div>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-semibold">7. Denúncias de Violação</h2>
              <div className="pl-4 space-y-3 text-sm text-muted-foreground leading-relaxed">
                <p>
                  Se você identificar uso não autorizado de nosso conteúdo, entre em contato imediatamente através dos canais oficiais.
                </p>
                <p>
                  Fornecemos recompensas para denúncias que resultem em ações efetivas contra violações.
                </p>
              </div>
            </section>

            <section className="space-y-4">
              <div className="flex items-center gap-2">
                <Scale className="size-5 text-primary" />
                <h2 className="text-xl font-semibold">8. Jurisdição e Lei Aplicável</h2>
              </div>
              <div className="pl-7 space-y-3 text-sm text-muted-foreground leading-relaxed">
                <p>
                  Esta declaração de direitos autorais é regida pelas leis brasileiras, especialmente:
                </p>
                <ul className="list-disc list-inside ml-4 space-y-1">
                  <li>Lei 9.610/98 (Lei de Direitos Autorais)</li>
                  <li>Lei 9.279/96 (Lei de Propriedade Industrial)</li>
                  <li>Código Penal Brasileiro (crimes contra propriedade intelectual)</li>
                </ul>
                <p>
                  Qualquer disputa será resolvida no foro da comarca de residência do autor.
                </p>
              </div>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-semibold">9. Contato para Questões de Direitos Autorais</h2>
              <div className="pl-4 space-y-3 text-sm text-muted-foreground leading-relaxed">
                <p>
                  Para questões relacionadas a direitos autorais, licenciamento ou denúncias de violação, entre em contato através dos canais oficiais disponibilizados em nossos produtos.
                </p>
                <p>
                  Responderemos a todas as consultas legítimas dentro de 48 horas úteis.
                </p>
              </div>
            </section>

            <div className="rounded-lg border bg-blue-50 dark:bg-blue-950/20 p-4 mt-8">
              <div className="flex items-start gap-3">
                <Copyright className="size-5 text-blue-500 mt-0.5 flex-shrink-0" />
                <div className="text-sm">
                  <p className="font-medium mb-1">Aviso de Copyright</p>
                  <p className="text-muted-foreground">
                    © {new Date().getFullYear()} David Simer. Todos os direitos reservados. 
                    Nenhuma parte deste material pode ser reproduzida ou transmitida de qualquer forma 
                    ou por qualquer meio sem a permissão prévia por escrito do autor.
                  </p>
                </div>
              </div>
            </div>
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