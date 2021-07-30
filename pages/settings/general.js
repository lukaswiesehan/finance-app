import {SettingsPage} from '@/components/settings/settings-page'
import {ProfileSettings} from '@/components/settings/profile-settings'
import {BusinessSettings} from '@/components/settings/business-settings'
import {Divider} from '@/components/common/elements/divider'

export const GeneralSettings = () => {
  return (
    <SettingsPage title="Allgemein">
      <ProfileSettings/>
      <Divider/>
      <BusinessSettings/>
    </SettingsPage>
  )
}

export default GeneralSettings
