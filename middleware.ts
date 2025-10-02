import { type NextRequest } from 'next/server'
import { updateSession } from '@/lib/supabase/middleware'

export async function middleware(request: NextRequest) {
  return await updateSession(request)
}

// Matcher otimizado: apenas rotas que REALMENTE precisam de verificação de auth
// Isso elimina recarregamentos desnecessários e melhora a navegação SPA
export const config = {
  matcher: [
    '/dashboard/:path*',
    '/planner/:path*',
    '/simulados/:path*',
    '/performance/:path*',
    '/settings/:path*',
    '/goals/:path*',
    '/sessions/:path*',
  ],
}
