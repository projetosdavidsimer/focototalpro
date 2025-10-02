'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import type { User } from '@supabase/supabase-js'

export function useAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    // Obter sessão inicial
    const getInitialSession = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession()
        
        if (error) {
          console.error('Error getting session:', error)
          // Se houver erro ao obter sessão, limpar estado
          setUser(null)
          // Limpar localStorage
          if (typeof window !== 'undefined') {
            const keys = Object.keys(localStorage)
            keys.forEach(key => {
              if (key.startsWith('sb-')) {
                localStorage.removeItem(key)
              }
            })
          }
        } else {
          setUser(session?.user ?? null)
        }
      } catch (error) {
        console.error('Unexpected error getting session:', error)
        setUser(null)
      } finally {
        setLoading(false)
      }
    }

    getInitialSession()

    // Escutar mudanças de autenticação
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log('Auth state changed:', event)
      
      if (event === 'SIGNED_OUT' || event === 'TOKEN_REFRESHED') {
        setUser(session?.user ?? null)
      } else if (event === 'SIGNED_IN') {
        setUser(session?.user ?? null)
        router.refresh()
      } else if (event === 'USER_UPDATED') {
        setUser(session?.user ?? null)
      }

      // Tratar erros de refresh token
      if (event === 'TOKEN_REFRESHED' && !session) {
        console.error('Token refresh failed, signing out')
        await supabase.auth.signOut()
        router.push('/login')
      }
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [router, supabase.auth])

  const signOut = async () => {
    try {
      await supabase.auth.signOut()
      
      // Limpar localStorage
      if (typeof window !== 'undefined') {
        const keys = Object.keys(localStorage)
        keys.forEach(key => {
          if (key.startsWith('sb-')) {
            localStorage.removeItem(key)
          }
        })
      }
      
      router.push('/login')
    } catch (error) {
      console.error('Error signing out:', error)
    }
  }

  return {
    user,
    loading,
    signOut,
  }
}
