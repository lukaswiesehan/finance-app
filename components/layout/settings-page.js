import {Container} from '@/components/container'
import {AppCanvas} from '@/components/layout/app-canvas'
import {Title} from '@/components/elements/title' 
import {TabMenu} from '@/components/layout/tab-menu'

export const SettingsPage = ({title, children}) => {
  const settingsPages = [
    {name: 'Allgemein', href: '/settings/general'},
    {name: 'Unternehmen', href: '/settings/business'},
    {name: 'Angebote', href: '/settings/quotes'},
    {name: 'Rechnungen', href: '/settings/invoices'},
    {name: 'Bankkonto', href: '/settings/bank'},
  ]

  return (
    <Container title={`Einstellungen/${title} - Finance App`}>
      <AppCanvas>
        <div className="space-y-4">
          <h1><Title>Einstellungen</Title></h1>
          <p>I'm baby readymade organic vice salvia scenester butcher. Narwhal skateboard gastropub.</p>
        </div>
        <TabMenu elements={settingsPages}/>
        <div>
          {children}
        </div>
      </AppCanvas>
    </Container>
  )
}