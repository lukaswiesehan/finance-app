import {Container} from '@/components/common/container'
import {AppCanvas} from '@/components/common/layout/app-canvas'
import {Title} from '@/components/common/elements/title' 
import {TabMenu} from '@/components/common/layout/tab-menu'

export const SettingsPage = ({title, children}) => {
  const settingsPages = [
    {name: 'Allgemein', href: '/settings/general'},
    {name: 'Angebote', href: '/settings/quotes'},
    {name: 'Rechnungen', href: '/settings/invoices'},
    {name: 'Emails', href: '/settings/emails'},
    {name: 'Bankkonto', href: '/settings/bank'},
  ]

  return (
    <Container title={`Einstellungen/${title} - Finance App`}>
      <AppCanvas>
        <h1><Title>Einstellungen</Title></h1>
        <TabMenu elements={settingsPages}/>
        <div>
          {children}
        </div>
      </AppCanvas>
    </Container>
  )
}