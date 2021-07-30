import {Container} from '@/components/common/container'
import {BlankCanvas} from '@/components/common/layout/blank-canvas'
import {ResetPassword} from '@/components/auth/reset-password'

export const ResetPasswordPage = () => {
  return (
    <Container title="Passwort zurücksetzen">
      <BlankCanvas>
        <ResetPassword/>
      </BlankCanvas>
    </Container>
  )
}

export default ResetPasswordPage
