/**
 * Utility to clear all Supabase authentication data
 * Use this when you encounter persistent auth errors
 */

export function clearAuthData() {
  if (typeof window === 'undefined') {
    return
  }

  // Clear localStorage
  const keys = Object.keys(localStorage)
  keys.forEach(key => {
    if (key.startsWith('sb-')) {
      localStorage.removeItem(key)
      console.log('Removed from localStorage:', key)
    }
  })

  // Clear sessionStorage
  const sessionKeys = Object.keys(sessionStorage)
  sessionKeys.forEach(key => {
    if (key.startsWith('sb-')) {
      sessionStorage.removeItem(key)
      console.log('Removed from sessionStorage:', key)
    }
  })

  // Clear cookies
  document.cookie.split(';').forEach(cookie => {
    const [name] = cookie.trim().split('=')
    if (name.includes('sb-')) {
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`
      console.log('Removed cookie:', name)
    }
  })

  console.log('All Supabase auth data cleared')
}

// Export for use in browser console during debugging
if (typeof window !== 'undefined') {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (window as any).clearAuthData = clearAuthData
}
