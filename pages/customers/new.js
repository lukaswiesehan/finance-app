import {Container} from '@/components/common/container'
import {AppCanvas} from '@/components/common/layout/app-canvas'
import {NewCustomer} from '@/components/customers/new-customer'

export const NewCustomerPage = () => {
  return (
    <Container>
      <AppCanvas>
        <NewCustomer/>
      </AppCanvas>
    </Container>
  )
}

export default NewCustomerPage
