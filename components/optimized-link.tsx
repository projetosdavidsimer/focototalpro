'use client'

import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation'
import { MouseEvent, ReactNode, startTransition } from 'react'
import { cn } from '@/lib/utils'

interface OptimizedLinkProps {
  href: string
  children: ReactNode
  className?: string
  onClick?: () => void
  prefetch?: boolean
}

export function OptimizedLink({ 
  href, 
  children, 
  className, 
  onClick,
  prefetch = true 
}: OptimizedLinkProps) {
  const router = useRouter()
  const pathname = usePathname()
  const isActive = pathname === href

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    // Permitir Ctrl+Click e Cmd+Click para abrir em nova aba
    if (e.metaKey || e.ctrlKey) {
      return
    }

    e.preventDefault()
    
    if (onClick) onClick()
    
    // Usar startTransition para navegação mais suave
    startTransition(() => {
      router.push(href)
    })
  }

  return (
    <Link 
      href={href} 
      className={cn(className, isActive && 'active')}
      onClick={handleClick}
      prefetch={prefetch}
    >
      {children}
    </Link>
  )
}
