import {useEffect} from 'react'
import {useRouter} from 'next/router'

import {useSupabase} from '@/lib/supabase'
import {Container} from '@/components/container'
import {BlankCanvas} from '@/components/layout/blank-canvas'
import {Card} from '@/components/layout/card'
import {CardMain} from '@/components/layout/card-main'
import {CardBottom} from '@/components/layout/card-bottom'
import {Heading} from '@/components/elements/heading'
import {ChevronLink} from '@/components/elements/chevron-link'

export const IndexPage = () => {
  const router = useRouter()
  const supabase = useSupabase()

  useEffect(() => {
    console.log(router.query)
    if(supabase.auth.user()) {
      router.push('/dashboard')
    }
  }, [])

  return (
    <Container>
      <BlankCanvas>
        <Card>
          <CardMain>
            <h1><Heading>Landing Page</Heading></h1>
            <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.</p>
          </CardMain>
          <CardBottom> 
            <p><ChevronLink href="/login" external={false}>Zum Login</ChevronLink></p>
            <p><ChevronLink href="/signup" external={false}>Zur Registrierung</ChevronLink></p>
            <p>{router.query}</p>
          </CardBottom>
        </Card>
      </BlankCanvas>
    </Container>
  )
}

export default IndexPage
