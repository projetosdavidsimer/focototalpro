"use client"

import Link from "next/link"
import {
  ShieldCheck,
  ArrowRight,
  CheckCircle2,
  LineChart,
  Users,
  GraduationCap,
  User,
  AlertCircle,
  Brain,
  FlaskConical,
  Activity,
  WifiOff,
  MonitorSmartphone,
  Timer,
  Target,
  BookOpen,
  FileText,
  Quote,
  ShoppingCart,
  Star,
  Sun,
  Moon,
  Monitor,
  X,
  List,
  Download,
} from "lucide-react"
import * as React from "react"

function mediaUrl(file: string) {
  return `/api/lp-media?file=${encodeURIComponent(file)}`
}

type LPTheme = "light" | "dark" | "system"

function resolveSystemTheme(): "light" | "dark" {
  if (typeof window === "undefined") return "light"
  return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
}

function SectionDivider() {
  return (
    <div className="mx-auto w-full max-w-6xl px-4" aria-hidden>
      <div className="h-px bg-border" />
    </div>
  )
}

export default function LandingPage() {
  // Tema local independente do app
  const [pref, setPref] = React.useState<LPTheme>("dark") // padrão: Dark
  const [mounted, setMounted] = React.useState(false)
  const [showChapters, setShowChapters] = React.useState(false)
  const [showSample, setShowSample] = React.useState(false)
  const [showBonus, setShowBonus] = React.useState(false)
  const applied: "light" | "dark" = pref === "system" ? resolveSystemTheme() : pref

  React.useEffect(() => {
    setMounted(true)
    const saved = localStorage.getItem("lp-theme") as LPTheme | null
    if (saved === "light" || saved === "dark" || saved === "system") setPref(saved)
  }, [])
  
  React.useEffect(() => {
    if (mounted) {
      localStorage.setItem("lp-theme", pref)
    }
  }, [pref, mounted])

  // Aplicar classe dark no documento
  React.useEffect(() => {
    if (mounted) {
      if (applied === "dark") {
        document.documentElement.classList.add("dark")
      } else {
        document.documentElement.classList.remove("dark")
      }
    }
  }, [applied, mounted])

  const logoStyle: React.CSSProperties = { color: "hsl(var(--primary))" }
  const btnTextClass = "text-primary-foreground"
  const btnIconClass = btnTextClass

  if (!mounted) {
    return <div className="min-h-dvh bg-background text-foreground" />
  }

  return (
    <div className="min-h-dvh bg-background text-foreground" data-theme={applied}>
      {/* HERO */}
      <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="mx-auto w-full max-w-6xl px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="size-8 rounded border bg-card text-card-foreground grid place-items-center">
              <Brain className="size-4 text-emerald-500" />
            </div>
            <div className="flex flex-col leading-tight">
              <span className="text-lg md:text-xl font-semibold" style={logoStyle}>Geração Z'umbi</span>
              <span className="text-sm text-muted-foreground">A Epidemia Digital</span>
            </div>
          </div>
          
          <nav className="hidden md:flex items-center gap-6">
            <button 
              onClick={() => setShowChapters(true)}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Capítulos
            </button>
            <button 
              onClick={() => setShowSample(true)}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Amostra Grátis
            </button>
            <Link href="/bonus" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Bônus
            </Link>
          </nav>

          <div className="flex items-center gap-2">
            <Link href="/checkout" className={`inline-flex items-center gap-2 rounded border bg-primary px-3 py-2 text-sm font-medium shadow-sm hover:brightness-110 ${btnTextClass}`}>
              Quero o meu E-book
              <ShoppingCart className={`size-4 ${btnIconClass}`} />
            </Link>
          </div>
        </div>
      </header>

      <section className="mx-auto w-full max-w-6xl px-4 py-10 md:py-14 grid grid-cols-1 md:grid-cols-2 gap-6 items-center justify-items-center">
        <div className="order-2 md:order-1 justify-self-center">
          <h1 className="mt-3 text-3xl md:text-6xl font-bold tracking-tight text-left">Sua atenção vale menos que a de um peixe dourado?</h1>
          <p className="mt-6 text-sm md:text-base text-muted-foreground leading-relaxed">Descubra como a Geração Z está perdendo 112 dias do ano para as telas e o que isso significa para o futuro — e como reverter esse quadro com passos práticos.</p>
          <div className="mt-5 flex items-center gap-3">
            <Link href="/checkout" className={`inline-flex items-center gap-3 rounded border bg-primary px-6 py-3 text-base font-semibold shadow-sm hover:brightness-110 ${btnTextClass}`}>
              Quero o meu E-book
              <ShoppingCart className={`size-5 ${btnIconClass}`} />
            </Link>
          </div>
          <p className="mt-2 text-sm text-muted-foreground">Pagamento único. Acesso imediato.</p>
        </div>
        <div className="order-1 md:order-2 group relative overflow-hidden rounded-2xl border bg-card shadow w-[60%] mx-auto">
          <video
            src={mediaUrl("gif-capa.mp4")}
            poster={mediaUrl("capa-ebook-pagina-de-check-out.jpg")}
            className="block h-auto w-full max-w-full bg-background mx-auto"
            autoPlay
            muted
            loop
            playsInline
            controls={false}
          />
          <div className="border-t px-3 py-2 text-center">
            <span className="text-sm text-muted-foreground">Mais de 5.000 leitores • Avaliação 5 estrelas</span>
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* SOCIAL PROOF (REFERÊNCIAS REAIS) */}
      <section className="mx-auto w-full max-w-6xl px-4 py-8">
        <div className="rounded border bg-card p-5 shadow">
          <div className="text-center text-sm text-muted-foreground mb-6">Baseado em pesquisas de instituições renomadas</div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="rounded border bg-background p-4 text-center">
              <div className="size-8 rounded border bg-card grid place-items-center mx-auto mb-2">
                <GraduationCap className="size-4 text-emerald-500" />
              </div>
              <div className="text-sm font-medium text-foreground">University College London</div>
              <div className="text-sm text-muted-foreground mt-1">Estudo sobre "apodrecimento cerebral" em jovens</div>
            </div>
            <div className="rounded border bg-background p-4 text-center">
              <div className="size-8 rounded border bg-card grid place-items-center mx-auto mb-2">
                <FileText className="size-4 text-emerald-500" />
              </div>
              <div className="text-xs font-medium text-foreground">Nature</div>
              <div className="text-xs text-muted-foreground mt-1">Redução de matéria cinzenta por vício digital</div>
            </div>
            <div className="rounded border bg-background p-4 text-center">
              <div className="size-8 rounded border bg-card grid place-items-center mx-auto mb-2">
                <Brain className="size-4 text-emerald-500" />
              </div>
              <div className="text-xs font-medium text-foreground">Journal of Neuroscience</div>
              <div className="text-xs text-muted-foreground mt-1">Alterações cerebrais em adolescentes</div>
            </div>
            <div className="rounded border bg-background p-4 text-center">
              <div className="size-8 rounded border bg-card grid place-items-center mx-auto mb-2">
                <LineChart className="size-4 text-emerald-500" />
              </div>
              <div className="text-xs font-medium text-foreground">McKinsey Health Institute</div>
              <div className="text-xs text-muted-foreground mt-1">Saúde mental da Geração Z no Brasil</div>
            </div>
            <div className="rounded border bg-background p-4 text-center">
              <div className="size-8 rounded border bg-card grid place-items-center mx-auto mb-2">
                <MonitorSmartphone className="size-4 text-emerald-500" />
              </div>
              <div className="text-xs font-medium text-foreground">Microsoft</div>
              <div className="text-xs text-muted-foreground mt-1">Capacidade de atenção de 8 segundos</div>
            </div>
            <div className="rounded border bg-background p-4 text-center">
              <div className="size-8 rounded border bg-card grid place-items-center mx-auto mb-2">
                <Users className="size-4 text-emerald-500" />
              </div>
              <div className="text-xs font-medium text-foreground">Instituto de Neurologia de Goiânia</div>
              <div className="text-xs text-muted-foreground mt-1">Mecanismo de vício digital</div>
            </div>
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* O que é o E-book */}
      <section className="mx-auto w-full max-w-6xl px-4 py-8">
        <div className="rounded border bg-card p-5 shadow">
          <div className="flex items-start gap-3">
            <div className="size-8 rounded border bg-background grid place-items-center"><BookOpen className="size-4 text-emerald-500" /></div>
            <div className="flex-1">
              <h2 className="text-xl md:text-2xl font-semibold tracking-tight">Geração Z'umbi — A Epidemia Digital</h2>
              <p className="mt-2 text-sm text-muted-foreground">Um guia essencial que desvenda a epidemia silenciosa da dependência digital que assola a Geração Z. Mergulhe nas consequências neurológicas, psicológicas e sociais do uso excessivo de smartphones e redes sociais, com dados e soluções práticas para recuperar o controle da atenção e da saúde mental.</p>
            </div>
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* BENEFÍCIOS */}
      <section className="mx-auto w-full max-w-6xl px-4 py-8">
        <div className="text-center mb-8">
          <h3 className="text-2xl md:text-4xl font-bold tracking-tight">O que você vai descobrir e conquistar</h3>
          <p className="mt-2 text-sm text-muted-foreground max-w-2xl mx-auto">Não é apenas sobre tecnologia, é sobre o futuro da sua mente e dos seus relacionamentos.</p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 items-start">
          <div className="space-y-4">
            <div className="rounded border bg-card p-5 shadow">
              <div className="flex items-start gap-4">
                <div className="size-10 rounded border bg-background grid place-items-center flex-shrink-0">
                  <Brain className="size-5 text-emerald-500" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-base mb-2">Entenda a raiz do problema</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">Neuroplasticidade, sequestro de dopamina e economia da atenção: como seu cérebro é hackeado e por quê isso importa.</p>
                </div>
              </div>
            </div>
            <div className="rounded border bg-card p-5 shadow">
              <div className="flex items-start gap-4">
                <div className="size-10 rounded border bg-background grid place-items-center flex-shrink-0">
                  <FlaskConical className="size-5 text-emerald-500" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-base mb-2">O caminho para a libertação digital</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">Estratégias práticas de conscientização, detox digital e reconexão com o mundo real.</p>
                </div>
              </div>
            </div>
            <div className="rounded border bg-card p-5 shadow">
              <div className="flex items-start gap-4">
                <div className="size-10 rounded border bg-background grid place-items-center flex-shrink-0">
                  <Target className="size-5 text-emerald-500" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-base mb-2">Mais foco e bem-estar</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">Melhore a saúde mental, aumente o foco e fortaleça relacionamentos reais.</p>
                </div>
              </div>
            </div>
            <div className="mt-6 text-center">
              <Link href="/checkout" className={`inline-flex items-center gap-3 rounded border bg-primary px-6 py-3 text-base font-semibold shadow-sm hover:brightness-110 ${btnTextClass}`}>
                Quero o meu E-book
                <ShoppingCart className={`size-5 ${btnIconClass}`} />
              </Link>
            </div>
          </div>
          <div className="group relative overflow-hidden rounded-2xl border bg-card shadow w-[70%] mx-auto">
            <video
              src={mediaUrl("gif-jail.mp4")}
              className="block h-auto w-full max-w-full bg-background"
              autoPlay
              muted
              loop
              playsInline
              controls={false}
            />
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* TESTEMUNHOS */}
      <section className="mx-auto w-full max-w-6xl px-4 py-8">
        <div className="rounded border bg-card p-5 shadow">
          <h3 className="text-lg md:text-xl font-semibold tracking-tight text-center">Quem já despertou da epidemia digital está dizendo…</h3>
          <div className="mt-4 grid gap-4 md:grid-cols-3">
            <Testimonial name="Marina S." role="Mãe e professora" text="Eu me sentia sem saída com meus alunos e meu filho. O E-book trouxe passos práticos que aplicamos em casa e na escola." />
            <Testimonial name="Lucas A." role="Estudante (17)" text="Eu era um zumbi digital: sem foco e ansioso. Consegui organizar o uso do celular e voltei a render nos estudos." />
            <Testimonial name="Dra. Renata" role="Psicóloga" text="Ferramentas simples, baseadas em ciência, que ajudam famílias a ganharem clareza e controle do tempo de tela." />
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* FAQ */}
      <section className="mx-auto w-full max-w-6xl px-4 py-8">
        <h3 className="text-lg md:text-xl font-semibold tracking-tight">Suas Dúvidas. Nossas Respostas. Seu Despertar.</h3>
        <div className="mt-4 grid gap-3">
          <FaqItem q="Meu filho só está sendo um adolescente normal, todo mundo usa celular o tempo todo." a={'"Normal" não significa saudável. O conteúdo mostra dados que diferenciam uso de dependência e os impactos neurológicos associados ao excesso.'} />
          <FaqItem q="Não posso simplesmente tirar o celular dele, é como ele se comunica com os amigos." a="Não se trata de proibir, mas recuperar o controle. O material propõe limites saudáveis, comunicação offline e reconstrução de relações." />
          <FaqItem q="Isso não é um problema real, é só falta de disciplina." a="Plataformas são projetadas para serem viciantes, explorando a neuroquímica do cérebro. Você entenderá os mecanismos e como reverter o processo." />
          <FaqItem q="A tecnologia também tem benefícios, não é só maldade." a="Concordamos. O foco é uso consciente e produtivo: colher benefícios evitando as armadilhas da dependência." />
        </div>
      </section>

      <SectionDivider />

      {/* CTA FINAL */}
      <section id="comprar" className="mx-auto w-full max-w-6xl px-4 py-10">
        <div className="text-center mb-8">
          <h3 className="text-2xl md:text-3xl font-bold tracking-tight">Não deixe a epidemia digital roubar seu futuro</h3>
          <p className="mt-3 text-base text-muted-foreground max-w-3xl mx-auto leading-relaxed">Junte-se a milhares que estão recuperando o controle de suas vidas. Baixe "Geração Z'umbi" agora e comece sua jornada de despertar.</p>
        </div>
        <div className="grid gap-8 md:grid-cols-2 items-center">
          <div className="rounded border bg-card p-6 shadow text-center space-y-4">
            <div className="size-12 rounded border bg-background grid place-items-center mx-auto">
              <AlertCircle className="size-6 text-emerald-500" />
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-2">Transforme sua relação com a tecnologia</h4>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">Recupere o controle da sua atenção e construa uma vida mais focada e significativa.</p>
              <div className="space-y-2 text-xs text-muted-foreground">
                <div className="flex items-center justify-center gap-2">
                  <CheckCircle2 className="size-3 text-emerald-500" />
                  <span>Acesso imediato após o pagamento</span>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <CheckCircle2 className="size-3 text-emerald-500" />
                  <span>Conteúdo baseado em pesquisas científicas</span>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <CheckCircle2 className="size-3 text-emerald-500" />
                  <span>Estratégias práticas e aplicáveis</span>
                </div>
              </div>
            </div>
            <div className="pt-2">
              <Link href="/checkout" className={`inline-flex items-center gap-3 rounded border bg-primary px-8 py-4 text-lg font-bold shadow-sm hover:brightness-110 transition-all ${btnTextClass}`}>
                Quero o meu E-book
                <ShoppingCart className={`size-5 ${btnIconClass}`} />
              </Link>
            </div>
          </div>
          <div className="group relative overflow-hidden rounded-2xl border bg-card shadow w-[60%] mx-auto">
            <video
              src={mediaUrl("gif-boy.mp4")}
              className="block h-auto w-full max-w-full bg-background"
              autoPlay
              muted
              loop
              playsInline
              controls={false}
            />
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* RODAPÉ */}
      <footer className="">
        <div className="mx-auto w-full max-w-6xl px-4 py-6 flex flex-col items-center gap-4">
          <LocalThemeToggle pref={pref} onChange={setPref} />
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-muted-foreground">
            <Link href="/termos" className="hover:underline">Termos e Condições</Link>
            <span className="opacity-50">•</span>
            <Link href="/privacidade" className="hover:underline">Política de Privacidade</Link>
            <span className="opacity-50">•</span>
            <Link href="/direitos-autorais" className="hover:underline">Direitos Autorais © {new Date().getFullYear()} D.S.</Link>
          </div>
        </div>
      </footer>

      {/* Modal de Capítulos */}
      {showChapters && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="relative w-full max-w-2xl max-h-[80vh] overflow-hidden rounded-xl border bg-card shadow-2xl">
            <div className="sticky top-0 flex items-center justify-between p-6 border-b bg-card/80 backdrop-blur">
              <div className="flex items-center gap-3">
                <div className="size-8 rounded-lg border bg-background grid place-items-center">
                  <List className="size-4 text-emerald-500" />
                </div>
                <h2 className="text-xl font-semibold">Índice de Capítulos</h2>
              </div>
              <button
                onClick={() => setShowChapters(false)}
                className="size-8 rounded-lg border bg-background hover:bg-muted transition-colors grid place-items-center"
              >
                <X className="size-4" />
              </button>
            </div>
            
            <div className="p-6 space-y-4 overflow-y-auto max-h-[calc(80vh-80px)] scrollbar-thin scrollbar-track-transparent scrollbar-thumb-muted/30 hover:scrollbar-thumb-muted-foreground/60">
              <div className="rounded-lg border bg-background p-4">
                <div className="flex items-start gap-3">
                  <div className="size-6 rounded border bg-primary/10 text-primary grid place-items-center text-xs font-bold flex-shrink-0 mt-0.5">
                    1
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm mb-1">A Grande Crise Zumbi</h3>
                    <p className="text-xs text-muted-foreground">Introdução e Panorama Alarmante</p>
                  </div>
                </div>
              </div>

              <div className="rounded-lg border bg-background p-4">
                <div className="flex items-start gap-3">
                  <div className="size-6 rounded border bg-primary/10 text-primary grid place-items-center text-xs font-bold flex-shrink-0 mt-0.5">
                    2
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm mb-1">Cérebros Hackeados</h3>
                    <p className="text-xs text-muted-foreground">Fundamentos Neurológicos da Dependência Digital</p>
                  </div>
                </div>
              </div>

              <div className="rounded-lg border bg-background p-4">
                <div className="flex items-start gap-3">
                  <div className="size-6 rounded border bg-primary/10 text-primary grid place-items-center text-xs font-bold flex-shrink-0 mt-0.5">
                    3
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm mb-1">Evidências Médicas do Impacto Psicológico</h3>
                    <p className="text-xs text-muted-foreground">Análise científica dos efeitos na saúde mental</p>
                  </div>
                </div>
              </div>

              <div className="rounded-lg border bg-background p-4">
                <div className="flex items-start gap-3">
                  <div className="size-6 rounded border bg-primary/10 text-primary grid place-items-center text-xs font-bold flex-shrink-0 mt-0.5">
                    4
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm mb-1">O Papel dos Algoritmos de IA</h3>
                    <p className="text-xs text-muted-foreground">Na Intensificação do Problema</p>
                  </div>
                </div>
              </div>

              <div className="rounded-lg border bg-background p-4">
                <div className="flex items-start gap-3">
                  <div className="size-6 rounded border bg-primary/10 text-primary grid place-items-center text-xs font-bold flex-shrink-0 mt-0.5">
                    5
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm mb-1">Impactos no Desenvolvimento</h3>
                    <p className="text-xs text-muted-foreground">Social e Acadêmico</p>
                  </div>
                </div>
              </div>

              <div className="rounded-lg border bg-background p-4">
                <div className="flex items-start gap-3">
                  <div className="size-6 rounded border bg-primary/10 text-primary grid place-items-center text-xs font-bold flex-shrink-0 mt-0.5">
                    6
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm mb-1">Previsões Baseadas em Modelos Científicos</h3>
                    <p className="text-xs text-muted-foreground">Cenários futuros e tendências</p>
                  </div>
                </div>
              </div>

              <div className="rounded-lg border bg-background p-4">
                <div className="flex items-start gap-3">
                  <div className="size-6 rounded border bg-primary/10 text-primary grid place-items-center text-xs font-bold flex-shrink-0 mt-0.5">
                    7
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm mb-1">Estratégias de Intervenção e Tratamento</h3>
                    <p className="text-xs text-muted-foreground">Soluções práticas e eficazes</p>
                  </div>
                </div>
              </div>

              <div className="rounded-lg border bg-background p-4">
                <div className="flex items-start gap-3">
                  <div className="size-6 rounded border bg-primary/10 text-primary grid place-items-center text-xs font-bold flex-shrink-0 mt-0.5">
                    8
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm mb-1">Recomendações para Pais, Educadores</h3>
                    <p className="text-xs text-muted-foreground">e Formuladores de Políticas</p>
                  </div>
                </div>
              </div>

              <div className="rounded-lg border bg-emerald-50 dark:bg-emerald-950/20 p-4">
                <div className="flex items-start gap-3">
                  <div className="size-6 rounded border bg-emerald-500/20 text-emerald-600 grid place-items-center text-xs font-bold flex-shrink-0 mt-0.5">
                    ✓
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm mb-1 text-emerald-800 dark:text-emerald-200">Conclusão</h3>
                    <p className="text-xs text-emerald-700 dark:text-emerald-300">Despertando da Epidemia Digital</p>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t">
                <Link 
                  href="/checkout" 
                  onClick={() => setShowChapters(false)}
                  className={`w-full inline-flex items-center justify-center gap-3 rounded border bg-primary px-6 py-3 text-base font-semibold shadow-sm hover:brightness-110 transition-all ${btnTextClass}`}
                >
                  Quero o E-book Completo
                  <ShoppingCart className={`size-5 ${btnIconClass}`} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Amostra Grátis */}
      {showSample && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="relative w-full max-w-md overflow-hidden rounded-xl border bg-card shadow-2xl">
            <div className="flex items-center justify-between p-6 border-b">
              <div className="flex items-center gap-3">
                <div className="size-8 rounded-lg border bg-background grid place-items-center">
                  <Download className="size-4 text-emerald-500" />
                </div>
                <h2 className="text-xl font-semibold">Amostra Grátis</h2>
              </div>
              <button
                onClick={() => setShowSample(false)}
                className="size-8 rounded-lg border bg-background hover:bg-muted transition-colors grid place-items-center"
              >
                <X className="size-4" />
              </button>
            </div>
            
            <div className="p-6 text-center space-y-4">
              <div className="relative overflow-hidden rounded-lg border bg-background shadow-sm w-32 mx-auto">
                <img
                  src={mediaUrl("capa-ebook-pagina-de-check-out.jpg")}
                  alt="Capa do E-book Geração Z'umbi"
                  className="w-full h-auto object-cover"
                />
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-2">Geração Z'umbi — A Epidemia Digital</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Baixe gratuitamente o primeiro capítulo e descubra como a dependência digital está afetando a Geração Z.
                </p>
                <div className="text-xs text-muted-foreground mb-4">
                  <p className="font-medium">Capítulo 1: A Grande Crise Zumbi</p>
                  <p>Introdução e Panorama Alarmante</p>
                </div>
              </div>

              <a
                href={mediaUrl("Amostra_Gratis_Capitulo_1.pdf")}
                download="Geracao-Zumbi-Capitulo-1.pdf"
                className={`w-full inline-flex items-center justify-center gap-3 rounded border bg-primary px-6 py-3 text-base font-semibold shadow-sm hover:brightness-110 transition-all ${btnTextClass}`}
              >
                <Download className={`size-5 ${btnIconClass}`} />
                Baixar Amostra Grátis
              </a>
              
              <p className="text-xs text-muted-foreground">
                PDF • Download imediato • Sem cadastro necessário
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function BenefitItem({ title, text, icon }: { title: string; text: string; icon: React.ReactNode }) {
  return (
    <div className="flex items-start gap-3">
      <div className="size-8 rounded-lg border bg-background grid place-items-center text-muted-foreground">{icon}</div>
      <div>
        <div className="text-sm font-medium">{title}</div>
        <p className="text-sm text-muted-foreground">{text}</p>
      </div>
    </div>
  )
}

function Testimonial({ name, role, text }: { name: string; role: string; text: string }) {
  return (
    <div className="rounded border bg-card p-4 shadow">
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-full border bg-background flex items-center justify-center text-xs font-medium text-muted-foreground flex-shrink-0">
          {name.split(" ")[0][0]}{name.split(" ")[1]?.[0] || ""}
        </div>
        <div>
          <p className="text-sm">“{text}”</p>
          <p className="mt-2 text-xs text-muted-foreground">{name} • {role}</p>
        </div>
      </div>
    </div>
  )
}

function FaqItem({ q, a }: { q: string; a: string }) {
  return (
    <details className="rounded border bg-card p-4 shadow open:shadow-md transition-shadow">
      <summary className="cursor-pointer list-none text-sm font-medium flex items-center justify-between">
        {q}
        <ArrowRight className="size-4 text-emerald-500 rotate-90 group-open:-rotate-90 transition-transform" />
      </summary>
      <p className="mt-2 text-sm text-muted-foreground">{a}</p>
    </details>
  )
}

function LocalThemeToggle({ pref, onChange }: { pref: LPTheme; onChange: (v: LPTheme) => void }) {
  const current: LPTheme = pref
  const Item = ({ value, label, Icon }: { value: LPTheme; label: string; Icon: any }) => (
    <button
      type="button"
      role="radio"
      aria-label={label}
      aria-checked={current === value}
      data-state={current === value ? "on" : "off"}
      onClick={() => onChange(value)}
      className={
        "flex h-8 w-8 items-center justify-center rounded-full p-0 text-muted-foreground transition-all " +
        "hover:bg-muted hover:text-foreground data-[state=on]:bg-primary data-[state=on]:text-primary-foreground data-[state=on]:shadow-sm " +
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      }
    >
      <Icon className="h-4 w-4" aria-hidden="true" />
    </button>
  )
  return (
    <div role="radiogroup" aria-label="Alternar tema" className="inline-flex items-center gap-0.5 rounded-full border border-input bg-background p-1 shadow-sm">
      <Item value="light" label="Tema claro" Icon={Sun} />
      <Item value="system" label="Tema do sistema" Icon={Monitor} />
      <Item value="dark" label="Tema escuro" Icon={Moon} />
    </div>
  )
}
