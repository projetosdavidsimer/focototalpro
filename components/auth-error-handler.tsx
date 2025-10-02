'use client'

import { useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

export function AuthErrorHandler({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    // Escutar erros de autenticação
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      // Se o token expirou ou houve erro de refresh
      if (event === 'TOKEN_REFRESHED' && !session) {
        console.error('Token refresh failed - clearing session')
        
        // Limpar localStorage
        if (typeof window !== 'undefined') {
          const keys = Object.keys(localStorage)
          keys.forEach(key => {
            if (key.startsWith('sb-')) {
              localStorage.removeItem(key)
            }
          })
        }
        
        // Fazer sign out completo
        await supabase.auth.signOut()
        
        // Redirecionar para login
        router.push('/login?error=session_expired')
      }
    })

    // Adicionar listener global para erros de autenticação
    const handleAuthError = (event: ErrorEvent) => {
      const error = event.error || event.message
      
      if (
        error &&
        typeof error === 'object' &&
        'message' in error &&
        typeof error.message === 'string' &&
        (error.message.includes('Invalid Refresh Token') ||
          error.message.includes('Refresh Token Not Found'))
      ) {
        console.error('Auth error detected:', error.message)
        
        // Limpar sessão
        if (typeof window !== 'undefined') {
          const keys = Object.keys(localStorage)
          keys.forEach(key => {
            if (key.startsWith('sb-')) {
              localStorage.removeItem(key)
            }
          })
        }
        
        // Prevenir propagação do erro
        event.preventDefault()
        
        // Redirecionar para login
        router.push('/login?error=session_expired')
      }
    }

    window.addEventListener('error', handleAuthError)

    return () => {
      subscription.unsubscribe()
      window.removeEventListener('error', handleAuthError)
    }
  }, [router, supabase.auth])

  return <>{children}</>
}
