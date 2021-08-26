import {useRouter} from 'next/router'

import {Container} from '@/components/common/container'
import {AppCanvas} from '@/components/common/layout/app-canvas'
import {Title} from '@/components/common/elements/title'
import {Breadcrumbs} from '@/components/common/elements/breadcrumbs'
import {Button} from '@/components/common/elements/button'
import {faUserPlus} from '@fortawesome/pro-solid-svg-icons'
import {ClientsTable} from '@/components/clients/clients-table'

export const CustomersPage = () => {
  const router = useRouter()

  return (
    <Container>
      <AppCanvas>
        <div className="sm:flex sm:justify-between sm:items-center space-y-16 sm:space-y-0">
          <div className="space-y-2">
            <Title>Kunden</Title>
            <Breadcrumbs elements={[
              {title: 'Kunden', href: '/clients'}
            ]}/>
          </div>
          <Button icon={faUserPlus} label="Neuer Kunde" onClick={() => {router.push('/clients/new')}}/>
        </div>
        <ClientsTable/>
      </AppCanvas>
    </Container>
  )
}

export default CustomersPage
