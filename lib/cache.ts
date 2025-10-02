import { unstable_cache } from 'next/cache'

/**
 * Sistema de cache universal para o SaaS
 * Garante navegação instantânea com dados pré-carregados
 */

// Tempos de revalidação por tipo de dado
export const CACHE_TIMES = {
  DASHBOARD_STATS: 60, // 1 minuto
  USER_DATA: 300, // 5 minutos
  SUBJECTS: 180, // 3 minutos
  SESSIONS: 60, // 1 minuto
  EXAMS: 120, // 2 minutos
  PERFORMANCE: 180, // 3 minutos
} as const

/**
 * Wrapper para cache de actions do Supabase
 * Uso: const cachedData = await withCache('key', () => fetchData(), 60)
 */
export function withCache<T>(
  key: string | string[],
  fn: () => Promise<T>,
  revalidate: number = 60,
  tags?: string[]
) {
  const cacheKey = Array.isArray(key) ? key : [key]
  
  return unstable_cache(fn, cacheKey, {
    revalidate,
    tags: tags || cacheKey,
  })()
}

/**
 * Gera chave de cache única por usuário
 */
export function userCacheKey(userId: string, resource: string): string[] {
  return ['user', userId, resource]
}

/**
 * Tags de cache para invalidação em grupo
 */
export const CACHE_TAGS = {
  dashboard: (userId: string) => `dashboard-${userId}`,
  subjects: (userId: string) => `subjects-${userId}`,
  sessions: (userId: string) => `sessions-${userId}`,
  exams: (userId: string) => `exams-${userId}`,
  performance: (userId: string) => `performance-${userId}`,
  user: (userId: string) => `user-${userId}`,
} as const

/**
 * Invalidar cache específico
 * Uso: await revalidateCache(CACHE_TAGS.dashboard(userId))
 */
export async function revalidateCache(tag: string) {
  const { revalidateTag } = await import('next/cache')
  revalidateTag(tag)
}

/**
 * Invalidar múltiplos caches
 */
export async function revalidateMultiple(tags: string[]) {
  const { revalidateTag } = await import('next/cache')
  tags.forEach(tag => revalidateTag(tag))
}
