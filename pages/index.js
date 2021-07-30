import {useEffect} from 'react'
import {useRouter} from 'next/router'

import {useSupabase} from '@/lib/supabase'
import {Container} from '@/components/common/container'
import {BlankCanvas} from '@/components/common/layout/blank-canvas'
import {Card} from '@/components/common/layout/card'
import {CardMain} from '@/components/common/layout/card-main'
import {CardBottom} from '@/components/common/layout/card-bottom'
import {Heading} from '@/components/common/elements/heading'
import {ChevronLink} from '@/components/common/elements/chevron-link'

export const IndexPage = () => {
  const router = useRouter()
  const supabase = useSupabase()

  useEffect(() => {
    if(supabase.auth.user()) {
      router.push('/dashboard')
    }
  }, [])

  return (
    <Container>
      <BlankCanvas>
        <Card>
          <CardMain className="p-12 space-y-12">
            <h1><Heading>Landing Page</Heading></h1>
            <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.</p>
          </CardMain>
          <CardBottom className="px-12 py-6"> 
            <p><ChevronLink href="/login" external={false}>Zum Login</ChevronLink></p>
            <p><ChevronLink href="/signup" external={false}>Zur Registrierung</ChevronLink></p>
          </CardBottom>
        </Card>
      </BlankCanvas>
    </Container>
  )
}

export default IndexPage
