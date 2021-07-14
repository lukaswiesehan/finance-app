import {useEffect} from 'react'
import {useRouter} from 'next/router'

import {useSupabase} from '@/lib/supabase'
import {Container} from '@/components/container'
import {BlankCanvas} from '@/components/layout/blank-canvas'
import {Login} from '@/components/login'

export const LoginPage = () => {
  const router = useRouter()
  const supabase = useSupabase()

  useEffect(() => {
    if(supabase.auth.user()) {
      router.push('/dashboard')
    }
  }, [])

  return (
    <Container title="Anmelden">
      <BlankCanvas>
        <Login/>
      </BlankCanvas>
    </Container>
  )
}

export default LoginPage
