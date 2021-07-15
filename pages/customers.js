import {Container} from '@/components/container'
import {AppCanvas} from '@/components/layout/app-canvas'
import {Title} from '@/components/elements/title'

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
