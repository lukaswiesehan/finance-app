import {useRouter} from 'next/router'

import {Container} from '@/components/common/container'
import {AppCanvas} from '@/components/common/layout/app-canvas'
import {Title} from '@/components/common/elements/title'

export const CustomersPage = () => {
  const router = useRouter()

  return (
    <Container title="404 - Finance App">
      <AppCanvas>
        <Title>404</Title>
        <div className="h-96">
          <p>Die angeforderte Seite existiert nicht.</p>
        </div>
      </AppCanvas>
    </Container>
  )
}

export default CustomersPage
