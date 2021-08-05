import {SettingsPage} from '@/components/settings/settings-page'
import {SettingsSection} from '@/components/settings/settings-section'
import {BusinessSettings} from '@/components/settings/business/business'
import {BankSettings} from '@/components/settings/business/bank'
import {TaxSettings} from '@/components/settings/business/taxes'
import {Divider} from '@/components/common/elements/divider'

export const BusinessSettingsPage = () => {
  return (
    <SettingsPage title="Unternehmen">
      <SettingsSection heading="Dein Unternehmen" description="Gib hier die Details zu Deinem Unternehmen ein.">
        <BusinessSettings/>
      </SettingsSection>
      <Divider/>
      <SettingsSection heading="Finanzen & Steuern" description="Gib hier die Details zu Deinem Unternehmen ein. Diese werden für die Rechnungstellung und weitere Funktionen benötigt.">
        <BankSettings/>
        <TaxSettings/>
      </SettingsSection>
    </SettingsPage>
  )
}

export default BusinessSettingsPage
