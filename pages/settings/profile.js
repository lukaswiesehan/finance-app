import {SettingsPage} from '@/components/settings/settings-page'
import {SettingsSection} from '@/components/settings/settings-section'
import {ProfileSettings} from '@/components/settings/profile/profile'
import {EmailSettings} from '@/components/settings/profile/email'
import {PasswordSettings} from '@/components/settings/profile/password'

export const ProfileSettingsPage = () => {
  return (
    <SettingsPage title="Profil">
      <SettingsSection heading="Dein Profil" description="Richte hier dein Profil ein, mit dem Du auf dein Finance Dashboard zugreifst.">
        <ProfileSettings/>
        <EmailSettings/>
        <PasswordSettings/>
      </SettingsSection>
    </SettingsPage>
  )
}

export default ProfileSettingsPage
