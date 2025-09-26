"use client"

import Link from "next/link"
import {
  ArrowLeft,
  Brain,
  ShoppingCart,
  CreditCard,
  Smartphone,
  QrCode,
  CheckCircle2,
  Shield,
  Download,
  Clock,
  Star,
  Users,
  Lock,
  Zap,
  MapPin,
  Loader2,
  Banknote,
  Wallet
} from "lucide-react"
import * as React from "react"

function mediaUrl(file: string) {
  return `/api/lp-media?file=${encodeURIComponent(file)}`
}

interface RegionData {
  country: string
  country_code: string
  currency: string
  price: string
  originalPrice: string
  discount: string
  gateway: string
  paymentMethods: Array<{
    id: string
    name: string
    description: string
    icon: React.ComponentType<any>
    discount?: string
  }>
}

const REGION_CONFIG: Record<string, RegionData> = {
  BR: {
    country: "Brasil",
    country_code: "BR",
    currency: "BRL",
    price: "R$ 35,90",
    originalPrice: "R$ 49,90",
    discount: "R$ 14,00",
    gateway: "mercadopago",
    paymentMethods: [
      {
        id: "credit-card",
        name: "Cartão de Crédito",
        description: "Visa, Mastercard, Elo • Parcelamento disponível",
        icon: CreditCard
      },
      {
        id: "pix",
        name: "PIX",
        description: "Aprovação instantânea • Menor taxa",
        icon: QrCode,
        discount: "5% OFF"
      },
      {
        id: "debit-card",
        name: "Cartão de Débito",
        description: "Débito Visa, Mastercard, Elo",
        icon: Banknote
      }
    ]
  },
  US: {
    country: "Estados Unidos",
    country_code: "US", 
    currency: "USD",
    price: "$27.90",
    originalPrice: "$39.90",
    discount: "$12.00",
    gateway: "stripe",
    paymentMethods: [
      {
        id: "credit-card",
        name: "Credit Card",
        description: "Visa, Mastercard, American Express",
        icon: CreditCard
      },
      {
        id: "paypal",
        name: "PayPal",
        description: "Pay with your PayPal account",
        icon: Wallet
      },
      {
        id: "apple-pay",
        name: "Apple Pay",
        description: "Touch ID or Face ID",
        icon: Smartphone
      }
    ]
  },
  // Países da Europa
  DE: {
    country: "Alemanha",
    country_code: "DE",
    currency: "EUR", 
    price: "€27,90",
    originalPrice: "€39,90",
    discount: "€12,00",
    gateway: "stripe",
    paymentMethods: [
      {
        id: "credit-card",
        name: "Kreditkarte",
        description: "Visa, Mastercard, American Express",
        icon: CreditCard
      },
      {
        id: "sepa",
        name: "SEPA Lastschrift",
        description: "Bankeinzug",
        icon: Banknote
      },
      {
        id: "sofort",
        name: "Sofort",
        description: "Sofortüberweisung",
        icon: Wallet
      }
    ]
  },
  FR: {
    country: "França",
    country_code: "FR",
    currency: "EUR",
    price: "€27,90", 
    originalPrice: "€39,90",
    discount: "€12,00",
    gateway: "stripe",
    paymentMethods: [
      {
        id: "credit-card",
        name: "Carte de crédit",
        description: "Visa, Mastercard, American Express",
        icon: CreditCard
      },
      {
        id: "sepa",
        name: "Virement SEPA",
        description: "Prélèvement bancaire",
        icon: Banknote
      },
      {
        id: "bancontact",
        name: "Bancontact",
        description: "Paiement sécurisé",
        icon: Wallet
      }
    ]
  },
  IT: {
    country: "Itália",
    country_code: "IT",
    currency: "EUR",
    price: "€27,90",
    originalPrice: "€39,90",
    discount: "€12,00",
    gateway: "stripe", 
    paymentMethods: [
      {
        id: "credit-card",
        name: "Carta di credito",
        description: "Visa, Mastercard, American Express",
        icon: CreditCard
      },
      {
        id: "sepa",
        name: "Bonifico SEPA",
        description: "Addebito diretto",
        icon: Banknote
      },
      {
        id: "bancontact",
        name: "Bancontact",
        description: "Pagamento sicuro",
        icon: Wallet
      }
    ]
  },
  ES: {
    country: "Espanha",
    country_code: "ES",
    currency: "EUR",
    price: "€27,90",
    originalPrice: "€39,90",
    discount: "€12,00",
    gateway: "stripe",
    paymentMethods: [
      {
        id: "credit-card",
        name: "Tarjeta de crédito",
        description: "Visa, Mastercard, American Express",
        icon: CreditCard
      },
      {
        id: "sepa",
        name: "Transferencia SEPA",
        description: "Domiciliación bancaria",
        icon: Banknote
      },
      {
        id: "bancontact",
        name: "Bancontact",
        description: "Pago seguro",
        icon: Wallet
      }
    ]
  },
  PT: {
    country: "Portugal",
    country_code: "PT", 
    currency: "EUR",
    price: "€27,90",
    originalPrice: "€39,90",
    discount: "€12,00",
    gateway: "stripe",
    paymentMethods: [
      {
        id: "credit-card",
        name: "Cartão de crédito",
        description: "Visa, Mastercard, American Express",
        icon: CreditCard
      },
      {
        id: "sepa",
        name: "Transferência SEPA",
        description: "Débito direto",
        icon: Banknote
      },
      {
        id: "multibanco",
        name: "Multibanco",
        description: "Pagamento seguro",
        icon: Wallet
      }
    ]
  },
  NL: {
    country: "Holanda",
    country_code: "NL",
    currency: "EUR",
    price: "€27,90",
    originalPrice: "€39,90",
    discount: "€12,00",
    gateway: "stripe",
    paymentMethods: [
      {
        id: "credit-card",
        name: "Creditcard",
        description: "Visa, Mastercard, American Express",
        icon: CreditCard
      },
      {
        id: "ideal",
        name: "iDEAL",
        description: "Nederlandse banken",
        icon: Banknote
      },
      {
        id: "sepa",
        name: "SEPA Incasso",
        description: "Automatische incasso",
        icon: Wallet
      }
    ]
  },
  BE: {
    country: "Bélgica", 
    country_code: "BE",
    currency: "EUR",
    price: "€27,90",
    originalPrice: "€39,90",
    discount: "€12,00",
    gateway: "stripe",
    paymentMethods: [
      {
        id: "credit-card",
        name: "Carte de crédit",
        description: "Visa, Mastercard, American Express",
        icon: CreditCard
      },
      {
        id: "bancontact",
        name: "Bancontact",
        description: "Paiement sécurisé belge",
        icon: Banknote
      },
      {
        id: "sepa",
        name: "Virement SEPA",
        description: "Prélèvement automatique",
        icon: Wallet
      }
    ]
  },
  AT: {
    country: "Áustria",
    country_code: "AT",
    currency: "EUR", 
    price: "€27,90",
    originalPrice: "€39,90",
    discount: "€12,00",
    gateway: "stripe",
    paymentMethods: [
      {
        id: "credit-card",
        name: "Kreditkarte",
        description: "Visa, Mastercard, American Express",
        icon: CreditCard
      },
      {
        id: "sepa",
        name: "SEPA Lastschrift",
        description: "Bankeinzug",
        icon: Banknote
      },
      {
        id: "sofort",
        name: "Sofort",
        description: "Sofortüberweisung",
        icon: Wallet
      }
    ]
  }
}

// Fallback para outros países (usar preço USD)
const DEFAULT_REGION: RegionData = {
  country: "Internacional",
  country_code: "US",
  currency: "USD",
  price: "$27.90", 
  originalPrice: "$39.90",
  discount: "$12.00",
  gateway: "stripe",
  paymentMethods: [
    {
      id: "credit-card",
      name: "Credit Card",
      description: "Visa, Mastercard, American Express",
      icon: CreditCard
    },
    {
      id: "paypal",
      name: "PayPal",
      description: "Pay with your PayPal account",
      icon: Wallet
    }
  ]
}

export default function CheckoutPage() {
  const [regionData, setRegionData] = React.useState<RegionData | null>(null)
  const [loading, setLoading] = React.useState(true)
  const [selectedPayment, setSelectedPayment] = React.useState<string>("")
  const [isProcessing, setIsProcessing] = React.useState(false)

  // Detectar região do usuário
  React.useEffect(() => {
    async function detectRegion() {
      try {
        const response = await fetch('https://get.geojs.io/v1/ip/country.json')
        const data = await response.json()
        const countryCode = data.country
        
        const region = REGION_CONFIG[countryCode] || DEFAULT_REGION
        setRegionData(region)
        setSelectedPayment(region.paymentMethods[0]?.id || "")
      } catch (error) {
        console.error('Erro ao detectar região:', error)
        const region = DEFAULT_REGION
        setRegionData(region)
        setSelectedPayment(region.paymentMethods[0]?.id || "")
      } finally {
        setLoading(false)
      }
    }

    detectRegion()
  }, [])

  const handlePayment = () => {
    if (!regionData) return
    
    setIsProcessing(true)
    // Simular processamento
    setTimeout(() => {
      setIsProcessing(false)
      alert(`Pagamento processado com sucesso via ${regionData.gateway}! Você receberá o e-book por email.`)
    }, 2000)
  }

  if (loading || !regionData) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex items-center gap-3">
          <Loader2 className="size-5 animate-spin text-primary" />
          <span className="text-sm text-muted-foreground">Carregando checkout...</span>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-background/80 backdrop-blur">
        <div className="mx-auto max-w-6xl px-4 py-4 flex items-center justify-between">
          <Link 
            href="/landing" 
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="size-4" />
            Voltar
          </Link>
          <div className="flex items-center gap-2">
            <div className="size-8 rounded border bg-card text-card-foreground grid place-items-center">
              <Brain className="size-4 text-emerald-500" />
            </div>
            <span className="text-lg font-semibold text-primary">Geração Z'umbi</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="size-4" />
            <span>{regionData.country}</span>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-4 py-8">
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Produto */}
          <div className="space-y-6">
            <div className="rounded border bg-card p-6 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="relative overflow-hidden rounded border bg-background shadow-sm w-32 flex-shrink-0">
                  <img
                    src={mediaUrl("capa-ebook-pagina-de-check-out.jpg")}
                    alt="Capa do E-book Gera��ão Z'umbi"
                    className="w-full h-auto object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h1 className="text-xl font-bold tracking-tight mb-2">Geração Z'umbi — A Epidemia Digital</h1>
                  <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                    Um guia essencial que desvenda a epidemia silenciosa da dependência digital. 
                    Descubra as consequências neurológicas e soluções práticas para recuperar o controle da atenção.
                  </p>
                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-1">
                      <Users className="size-4 text-emerald-500" />
                      <span className="text-muted-foreground">5.000+ leitores</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="size-4 text-yellow-500 fill-current" />
                      <span className="text-muted-foreground">4.9/5</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Benefícios */}
            <div className="rounded border bg-card p-6 shadow-sm">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <CheckCircle2 className="size-5 text-emerald-500" />
                O que você vai receber
              </h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <Download className="size-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium">E-book completo em PDF</p>
                    <p className="text-xs text-muted-foreground">Formato otimizado para leitura em qualquer dispositivo</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="size-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium">Acesso imediato</p>
                    <p className="text-xs text-muted-foreground">Receba por email em até 5 minutos após o pagamento</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Shield className="size-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium">Garantia de 7 dias</p>
                    <p className="text-xs text-muted-foreground">100% do seu dinheiro de volta se não ficar satisfeito</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Zap className="size-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium">Conteúdo exclusivo</p>
                    <p className="text-xs text-muted-foreground">Baseado em pesquisas científicas atuais</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Pagamento */}
          <div className="space-y-6">
            {/* Resumo do Pedido */}
            <div className="rounded border bg-card p-6 shadow-sm">
              <h2 className="text-lg font-semibold mb-4">Resumo do Pedido</h2>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm">E-book Geração Z'umbi</span>
                  <span className="text-sm font-medium line-through text-muted-foreground">{regionData.originalPrice}</span>
                </div>
                <div className="flex justify-between items-center text-green-600">
                  <span className="text-sm">Desconto de lançamento</span>
                  <span className="text-sm font-medium">-{regionData.discount}</span>
                </div>
                <div className="border-t pt-3">
                  <div className="flex justify-between items-center">
                    <span className="text-base font-semibold">Total</span>
                    <span className="text-xl font-bold text-primary">{regionData.price}</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">Pagamento único • Sem mensalidades</p>
                </div>
              </div>
            </div>

            {/* Formas de Pagamento */}
            <div className="rounded border bg-card p-6 shadow-sm">
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Lock className="size-5 text-emerald-500" />
                Forma de Pagamento
              </h2>
              
              <div className="space-y-3 mb-6">
                {regionData.paymentMethods.map((method) => {
                  const IconComponent = method.icon
                  return (
                    <button
                      key={method.id}
                      onClick={() => setSelectedPayment(method.id)}
                      className={`w-full p-4 rounded border text-left transition-all ${
                        selectedPayment === method.id 
                          ? "border-primary bg-primary/5" 
                          : "border-border hover:border-primary/50"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <IconComponent className="size-5 text-primary" />
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <p className="font-medium">{method.name}</p>
                            {method.discount && (
                              <span className="text-xs bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 px-2 py-0.5 rounded-full">
                                {method.discount}
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-muted-foreground">{method.description}</p>
                        </div>
                      </div>
                    </button>
                  )
                })}
              </div>

              {/* Botão de Pagamento */}
              <button
                onClick={handlePayment}
                disabled={isProcessing}
                className="w-full bg-primary text-primary-foreground px-6 py-4 rounded font-semibold text-lg shadow-sm hover:brightness-110 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="size-5 animate-spin" />
                    Processando...
                  </>
                ) : (
                  <>
                    <ShoppingCart className="size-5" />
                    Finalizar Compra • {regionData.price}
                  </>
                )}
              </button>

              <div className="mt-4 text-center">
                <p className="text-xs text-muted-foreground">
                  Pagamento processado via {regionData.gateway === 'mercadopago' ? 'Mercado Pago' : 'Stripe'}
                </p>
                <div className="flex items-center justify-center gap-2 mt-2">
                  <Shield className="size-4 text-emerald-500" />
                  <span className="text-xs text-muted-foreground">Pagamento 100% seguro e criptografado</span>
                </div>
              </div>
            </div>

            {/* Garantia */}
            <div className="rounded border bg-emerald-50 dark:bg-emerald-950/20 p-4">
              <div className="flex items-start gap-3">
                <Shield className="size-5 text-emerald-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-emerald-800 dark:text-emerald-200">
                    Garantia de Satisfação
                  </p>
                  <p className="text-xs text-emerald-700 dark:text-emerald-300 mt-1">
                    Se você não ficar 100% satisfeito com o conteúdo, devolvemos seu dinheiro em até 7 dias. 
                    Sem perguntas, sem complicações.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}