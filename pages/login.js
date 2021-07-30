import {useEffect} from 'react'
import {useRouter} from 'next/router'

import {useSupabase} from '@/lib/supabase'
import {Container} from '@/components/common/container'
import {BlankCanvas} from '@/components/common/layout/blank-canvas'
import {Login} from '@/components/auth/login'

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
