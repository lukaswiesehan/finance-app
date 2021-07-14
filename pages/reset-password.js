import {Container} from '@/components/container'
import {BlankCanvas} from '@/components/layout/blank-canvas'
import {ResetPassword} from '@/components/reset-password'

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
