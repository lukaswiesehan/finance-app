import {Container} from '@/components/common/container'
import {AppCanvas} from '@/components/common/layout/app-canvas'
import {NewClient} from '@/components/clients/new-client'

export const NewCustomerPage = () => {
  return (
    <Container>
      <AppCanvas>
        <NewClient/>
      </AppCanvas>
    </Container>
  )
}

export default NewCustomerPage
