'use client'

import { useEffect } from 'react'
import { usePreloadRoutes } from '@/hooks/use-route-preload'

/**
 * Componente que precarrega todas as rotas principais
 * Garante navegação instantânea em todo o app
 */

const MAIN_ROUTES = [
  '/dashboard',
  '/dashboard/stats',
  '/planner',
  '/planner/subjects',
  '/planner/sessions',
  '/planner/pomodoro',
  '/simulados',
  '/simulados/history',
  '/simulados/analysis',
  '/performance',
  '/performance/subjects',
  '/performance/weaknesses',
  '/settings',
  '/settings/profile',
  '/settings/preferences',
  '/settings/subscription',
  '/goals',
  '/sessions',
  '/pricing',
]

export function RoutePreloader() {
  const { preloadAll } = usePreloadRoutes(MAIN_ROUTES)

  useEffect(() => {
    // Precarregar rotas após 1 segundo (quando o app já carregou)
    const timer = setTimeout(() => {
      preloadAll()
    }, 1000)

    return () => clearTimeout(timer)
  }, [preloadAll])

  return null
}
