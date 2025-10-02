'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { MouseEvent, ReactNode } from 'react'

interface OptimizedLinkProps {
  href: string
  children: ReactNode
  className?: string
  onClick?: () => void
}

export function OptimizedLink({ href, children, className, onClick }: OptimizedLinkProps) {
  const router = useRouter()

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    if (onClick) onClick()
    
    // Prefetch e navegar
    router.prefetch(href)
    router.push(href)
  }

  return (
    <Link 
      href={href} 
      className={className}
      onClick={handleClick}
      prefetch={true}
    >
      {children}
    </Link>
  )
}
