import {SettingsPage} from '@/components/settings/settings-page'
import {SettingsSection} from '@/components/settings/settings-section'
import {ProfileSettings} from '@/components/settings/general/profile'
import {EmailSettings} from '@/components/settings/general/email'
import {PasswordSettings} from '@/components/settings/general/password'
import {BusinessSettings} from '@/components/settings/general/business'
import {BankSettings} from '@/components/settings/general/bank'
import {TaxSettings} from '@/components/settings/general/taxes'
import {Divider} from '@/components/common/elements/divider'

export const GeneralSettings = () => {
  return (
    <SettingsPage title="Allgemein">
      <SettingsSection heading="Dein Profil" description="Richte hier dein Profil ein, mit dem Du auf dein Finance Dashboard zugreifst.">
        <ProfileSettings/>
        <EmailSettings/>
        <PasswordSettings/>
      </SettingsSection>
      <Divider/>
      <SettingsSection heading="Dein Unternehmen" description="Gib hier die Details zu Deinem Unternehmen ein. Diese werden für die Rechnungstellung und weitere Funktionen benötigt.">
        <BusinessSettings/>
        <BankSettings/>
        <TaxSettings/>
      </SettingsSection>
    </SettingsPage>
  )
}

export default GeneralSettings
