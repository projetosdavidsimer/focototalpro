import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function updateSession(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  // Apenas verificar auth em rotas protegidas (matcher já filtra)
  let supabaseResponse = NextResponse.next({
    request,
  })

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseAnonKey) {
    return supabaseResponse
  }

  const supabase = createServerClient(
    supabaseUrl,
    supabaseAnonKey,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
          supabaseResponse = NextResponse.next({
            request,
          })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  // Verificar usuário e tratar erros de refresh token
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()

  // Se há erro de refresh token ou usuário não autenticado, redireciona para login
  if (error || !user) {
    // Limpar cookies de autenticação inválidos
    const url = request.nextUrl.clone()
    url.pathname = '/login'
    url.searchParams.set('redirect', pathname)
    
    const response = NextResponse.redirect(url)
    
    // Remover cookies de autenticação do Supabase
    const cookiesToRemove = [
      'sb-access-token',
      'sb-refresh-token',
    ]
    
    cookiesToRemove.forEach(cookieName => {
      response.cookies.delete(cookieName)
      // Também tentar com o formato completo do Supabase
      request.cookies.getAll().forEach(cookie => {
        if (cookie.name.includes('sb-') && cookie.name.includes('-auth-token')) {
          response.cookies.delete(cookie.name)
        }
      })
    })
    
    return response
  }

  return supabaseResponse
}
