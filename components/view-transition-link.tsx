'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { MouseEvent, ReactNode, startTransition } from 'react'
import { cn } from '@/lib/utils'

interface ViewTransitionLinkProps {
  href: string
  children: ReactNode
  className?: string
  onClick?: () => void
}

/**
 * Link com View Transitions API para transições nativas suaves
 * Fallback para navegação normal se não suportado
 */
export function ViewTransitionLink({
  href,
  children,
  className,
  onClick,
}: ViewTransitionLinkProps) {
  const router = useRouter()

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    // Permitir Ctrl+Click e Cmd+Click para abrir em nova aba
    if (e.metaKey || e.ctrlKey) {
      return
    }

    e.preventDefault()

    if (onClick) onClick()

    // Verificar suporte a View Transitions API
    if (
      typeof window !== 'undefined' &&
      'startViewTransition' in document &&
      typeof (document as any).startViewTransition === 'function'
    ) {
      // Usar View Transitions API nativa
      ;(document as any).startViewTransition(() => {
        startTransition(() => {
          router.push(href)
        })
      })
    } else {
      // Fallback para navegação normal com startTransition
      startTransition(() => {
        router.push(href)
      })
    }
  }

  return (
    <Link
      href={href}
      className={cn(className)}
      onClick={handleClick}
      prefetch={true}
    >
      {children}
    </Link>
  )
}
