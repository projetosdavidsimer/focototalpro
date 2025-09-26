"use client"

import Link from "next/link"
import { 
  ArrowLeft, 
  Download, 
  FileText, 
  BookOpen, 
  Users, 
  Brain,
  Target,
  CheckCircle2
} from "lucide-react"

function mediaUrl(file: string) {
  return `/api/lp-media?file=${encodeURIComponent(file)}`
}

export default function BonusPage() {
  const bonusMaterials = [
    {
      title: "Guia Prático: Reconectando-se na Era Digital",
      description: "Manual completo com estratégias práticas para reduzir a dependência digital e reconectar-se com o mundo real.",
      file: "Guia Prático_ Reconectando-se na Era Digital.pdf",
      icon: Target,
      category: "Guia Prático"
    },
    {
      title: "O Cérebro Sequestrado: Como a Tecnologia Está Moldando a Mente dos Jovens",
      description: "Análise aprofundada dos mecanismos neurológicos por trás da dependência digital na Geração Z.",
      file: "O Cérebro Sequestrado_ Como a Tecnologia Está Moldando a Mente dos Jovens.pdf",
      icon: Brain,
      category: "Pesquisa Científica"
    },
    {
      title: "Proposta do Programa \"Conexão Consciente\": Intervenção e Educação para a Saúde Digital da Geração Z",
      description: "Programa estruturado de intervenção educacional para promover o uso consciente da tecnologia.",
      file: "Proposta do Programa _Conexão Consciente__ Intervenção e Educação para a Saúde Digital da Geração Z.pdf",
      icon: Users,
      category: "Programa de Intervenção"
    },
    {
      title: "Relatório Analítico: A Crise da Dependência Digital e seus Impactos na Geração Z",
      description: "Relatório detalhado com dados estatísticos e análises sobre os impactos da dependência digital.",
      file: "Relatório Analítico_ A Crise da Dependência Digital e seus Impactos na Geração Z.pdf",
      icon: FileText,
      category: "Relatório Analítico"
    }
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="mx-auto w-full max-w-6xl px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link 
              href="/landing" 
              className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="size-4" />
              Voltar
            </Link>
            <div className="h-6 w-px bg-border" />
            <div className="flex items-center gap-2">
              <div className="size-8 rounded border bg-card text-card-foreground grid place-items-center">
                <Brain className="size-4 text-emerald-500" />
              </div>
              <div className="flex flex-col leading-tight">
                <span className="text-lg font-semibold text-primary">Materiais Bonus</span>
                <span className="text-sm text-muted-foreground">Conteúdo Exclusivo</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto w-full max-w-6xl px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            <BookOpen className="size-4" />
            Conteúdo Exclusivo
          </div>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            Materiais Bonus Exclusivos
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Acesse conteúdos complementares especializados sobre saúde digital e dependência tecnológica na Geração Z. 
            Materiais desenvolvidos por especialistas para aprofundar seu conhecimento.
          </p>
        </div>

        {/* Benefits Section */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="text-center p-6 rounded border bg-card">
            <div className="size-12 rounded border bg-background grid place-items-center mx-auto mb-4">
              <Brain className="size-6 text-emerald-500" />
            </div>
            <h3 className="font-semibold mb-2">Baseado em Ciência</h3>
            <p className="text-sm text-muted-foreground">
              Conteúdo fundamentado em pesquisas científicas e estudos neurológicos
            </p>
          </div>
          
          <div className="text-center p-6 rounded border bg-card">
            <div className="size-12 rounded border bg-background grid place-items-center mx-auto mb-4">
              <Target className="size-6 text-emerald-500" />
            </div>
            <h3 className="font-semibold mb-2">Estratégias Práticas</h3>
            <p className="text-sm text-muted-foreground">
              Ferramentas e técnicas aplicáveis no dia a dia para mudanças reais
            </p>
          </div>
          
          <div className="text-center p-6 rounded border bg-card">
            <div className="size-12 rounded border bg-background grid place-items-center mx-auto mb-4">
              <Users className="size-6 text-emerald-500" />
            </div>
            <h3 className="font-semibold mb-2">Para Toda Família</h3>
            <p className="text-sm text-muted-foreground">
              Orientações para pais, educadores e jovens da Geração Z
            </p>
          </div>
        </div>

        {/* Materials Grid */}
        <div className="grid gap-6 md:grid-cols-2">
          {bonusMaterials.map((material, index) => (
            <div key={index} className="rounded border bg-card p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded flex items-center justify-center">
                  <material.icon className="w-6 h-6 text-primary" />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-muted text-muted-foreground">
                      {material.category}
                    </span>
                  </div>
                  
                  <h3 className="text-lg font-semibold text-foreground mb-2 leading-tight">
                    {material.title}
                  </h3>
                  
                  <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                    {material.description}
                  </p>
                  
                  <div className="flex items-center gap-2 text-xs text-muted-foreground mb-4">
                    <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                    <span>PDF de alta qualidade</span>
                    <span>•</span>
                    <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                    <span>Conteúdo especializado</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-12 text-center p-8 rounded border bg-card">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold mb-4">
              Quer o E-book Completo?
            </h2>
            <p className="text-muted-foreground mb-6">
              Estes materiais bonus complementam perfeitamente o conteúdo principal do e-book "Geração Z'umbi - A Epidemia Digital". 
              Tenha acesso ao guia completo com estratégias detalhadas para combater a dependência digital.
            </p>
            <Link 
              href="/checkout"
              className="inline-flex items-center gap-3 px-6 py-3 bg-primary text-primary-foreground hover:bg-primary/90 transition-colors font-semibold rounded"
            >
              <BookOpen className="size-5" />
              Quero meu E-book
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}