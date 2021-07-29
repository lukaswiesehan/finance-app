import {SettingsPage} from '@/components/layout/settings-page'
import {Divider} from '@/components/elements/divider'
import {ProfileSettings} from '@/components/profile-settings'

export const GeneralSettings = () => {
  return (
    <SettingsPage title="Allgemein">
      <ProfileSettings/>
      <Divider/>
    </SettingsPage>
  )
}

export default GeneralSettings
