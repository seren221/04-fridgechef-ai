
import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!url || !key || url === 'undefined' || !url.startsWith('http')) {
    console.warn('Supabase env vars missing or invalid!', { url, key })
    // Return a dummy client to prevent build crash, but auth won't work
    return createBrowserClient('https://placeholder.supabase.co', 'placeholder')
  }

  return createBrowserClient(url, key)
}
