import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Missing Supabase environment variables')
  }

  return createBrowserClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll() {
        if (typeof document === 'undefined') {
          return []
        }
        return document.cookie.split(';').map(cookie => {
          const [name, ...rest] = cookie.trim().split('=')
          return { name, value: rest.join('=') }
        }).filter(cookie => cookie.name)
      },
      setAll(cookiesToSet) {
        if (typeof document === 'undefined') {
          return
        }
        cookiesToSet.forEach(({ name, value, options }) => {
          let cookie = `${name}=${value}`
          
          if (options?.maxAge) {
            cookie += `; max-age=${options.maxAge}`
          }
          if (options?.path) {
            cookie += `; path=${options.path}`
          }
          if (options?.domain) {
            cookie += `; domain=${options.domain}`
          }
          if (options?.sameSite) {
            cookie += `; samesite=${options.sameSite}`
          }
          if (options?.secure) {
            cookie += '; secure'
          }
          
          document.cookie = cookie
        })
      },
    },
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
      flowType: 'pkce',
      storage: typeof window !== 'undefined' ? window.localStorage : undefined,
    },
  })
}
