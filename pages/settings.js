import {Container} from '@/components/container'
import {AppCanvas} from '@/components/layout/app-canvas'
import {Title} from '@/components/elements/title'

export const DashboardPage = () => {
  return (
    <Container>
      <AppCanvas>
        <Title>Einstellungen</Title>
        <div className="h-screen"></div>
      </AppCanvas>
    </Container>
  )
}

export default DashboardPage
