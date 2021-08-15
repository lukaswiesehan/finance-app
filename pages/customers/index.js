import {useRouter} from 'next/router'

import {Container} from '@/components/common/container'
import {AppCanvas} from '@/components/common/layout/app-canvas'
import {Title} from '@/components/common/elements/title'
import {Breadcrumbs} from '@/components/common/elements/breadcrumbs'
import {Button} from '@/components/common/elements/button'
import {faUserPlus} from '@fortawesome/pro-solid-svg-icons'
import {CustomersTable} from '@/components/customers/customers-table'

export const CustomersPage = () => {
  const router = useRouter()

  return (
    <Container>
      <AppCanvas>
        <div className="flex justify-between items-center">
          <div className="space-y-2">
            <Title>Kunden</Title>
            <Breadcrumbs elements={[
              {title: 'Kunden', href: '/customers'}
            ]}/>
          </div>
          <Button icon={faUserPlus} label="Neuer Kunde" onClick={() => {router.push('/customers/new')}}/>
        </div>
        <CustomersTable/>
      </AppCanvas>
    </Container>
  )
}

export default CustomersPage
