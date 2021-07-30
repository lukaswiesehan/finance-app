import {Container} from '@/components/common/container'
import {AppCanvas} from '@/components/common/layout/app-canvas'
import {Title} from '@/components/common/elements/title'

export const CustomersPage = () => {
  return (
    <Container>
      <AppCanvas>
        <Title>Kunden</Title>
        <div className="h-screen"></div>
      </AppCanvas>
    </Container>
  )
}

export default CustomersPage
