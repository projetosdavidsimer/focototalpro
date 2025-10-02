'use client'

import { useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'

export function ViewTransitions() {
  const pathname = usePathname()
  const previousPathname = useRef(pathname)

  useEffect(() => {
    // Só executa se o pathname mudou
    if (previousPathname.current === pathname) {
      return
    }

    previousPathname.current = pathname

    // Habilitar View Transitions API se disponível
    if (typeof document !== 'undefined' && 'startViewTransition' in document) {
      const doc = document as Document & {
        startViewTransition?: (callback: () => void) => void
      }
      
      // Executar transição suave
      doc.startViewTransition?.(() => {
        // Scroll para o topo suavemente
        window.scrollTo({ top: 0, behavior: 'instant' })
      })
    } else {
      // Fallback para navegadores sem suporte
      window.scrollTo({ top: 0, behavior: 'instant' })
    }
  }, [pathname])

  return null
}
