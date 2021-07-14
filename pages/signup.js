import {useEffect} from 'react'
import {useRouter} from 'next/router'

import {useSupabase} from '@/lib/supabase'
import {Container} from '@/components/container'
import {BlankCanvas} from '@/components/layout/blank-canvas'
import {SignUp} from '@/components/signup'

export const SignUpPage = () => {
  const router = useRouter()
  const supabase = useSupabase()

  useEffect(() => {
    if(supabase.auth.user()) {
      router.push('/dashboard')
    }
  }, [])

  return (
    <Container title="Registrieren">
      <BlankCanvas>
        <SignUp/>
      </BlankCanvas>
    </Container>
  )
}

export default SignUpPage