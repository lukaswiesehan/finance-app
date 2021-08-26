import {useEffect} from 'react'
import {createClient} from '@supabase/supabase-js'
import {useRouter} from 'next/router'

import '../styles/globals.css'
import {NotificationProvider} from '@/lib/notifications'
import {SupabaseProvider} from '@/lib/supabase'

export const MyApp = ({Component, pageProps}) => {
  const router = useRouter()
  const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_KEY)
  const publicRoutes = ['/', '/login', '/signup', '/reset-password']

  useEffect(() => {
    if(!supabase.auth.user() && !publicRoutes.includes(router.pathname)) {
      router.push('/login')
    }
  }, [])

  return (
    <SupabaseProvider value={supabase}>
      <NotificationProvider>
        <Component {...pageProps}/>
      </NotificationProvider>
    </SupabaseProvider>
  )
}

export default MyApp
