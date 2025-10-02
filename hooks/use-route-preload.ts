'use client'

import { useRouter } from 'next/navigation'
import { useCallback } from 'react'

/**
 * Hook para preload de rotas no hover
 * Garante navegação instantânea ao clicar
 */
export function useRoutePreload() {
  const router = useRouter()

  const preloadRoute = useCallback((href: string) => {
    // Prefetch da rota
    router.prefetch(href)
    
    // Preload de recursos críticos
    if (typeof window !== 'undefined') {
      // Criar link invisível para forçar preload
      const link = document.createElement('link')
      link.rel = 'prefetch'
      link.href = href
      document.head.appendChild(link)
      
      // Remover após 5 segundos
      setTimeout(() => {
        document.head.removeChild(link)
      }, 5000)
    }
  }, [router])

  return { preloadRoute }
}

/**
 * Hook para preload múltiplo de rotas
 * Útil para precarregar todas as rotas principais ao montar o app
 */
export function usePreloadRoutes(routes: string[]) {
  const router = useRouter()

  const preloadAll = useCallback(() => {
    routes.forEach(route => {
      router.prefetch(route)
    })
  }, [routes, router])

  return { preloadAll }
}
