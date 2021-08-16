import {useEffect} from 'react'
import {useRouter} from 'next/router'

import {Container} from '@/components/common/container'
import {BlankCanvas} from '@/components/common/layout/blank-canvas'

export const IndexPage = () => {
  const router = useRouter()

  useEffect(() => {
    router.push('/dashboard')
  }, [])

  return (
    <Container>
      <BlankCanvas/>
    </Container>
  )
}

export default IndexPage
