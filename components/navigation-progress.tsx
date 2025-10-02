'use client'

import { useEffect, useState } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'

/**
 * Loading bar global estilo YouTube/GitHub
 * Mostra progresso durante navegação entre páginas
 */
export function NavigationProgress() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [isLoading, setIsLoading] = useState(false)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    // Inicia loading
    setIsLoading(true)
    setProgress(20)

    // Simula progresso
    const timer1 = setTimeout(() => setProgress(40), 100)
    const timer2 = setTimeout(() => setProgress(60), 200)
    const timer3 = setTimeout(() => setProgress(80), 300)
    
    // Completa loading
    const timer4 = setTimeout(() => {
      setProgress(100)
      setTimeout(() => {
        setIsLoading(false)
        setProgress(0)
      }, 200)
    }, 400)

    return () => {
      clearTimeout(timer1)
      clearTimeout(timer2)
      clearTimeout(timer3)
      clearTimeout(timer4)
    }
  }, [pathname, searchParams])

  if (!isLoading && progress === 0) return null

  return (
    <div
      className="fixed top-0 left-0 right-0 h-1 bg-primary z-50 transition-all duration-200 ease-out"
      style={{
        width: `${progress}%`,
        opacity: isLoading ? 1 : 0,
      }}
    >
      <div className="absolute right-0 top-0 h-full w-20 bg-gradient-to-r from-transparent to-primary/50 animate-pulse" />
    </div>
  )
}
