import {useNotifications} from '@/lib/notifications'
import {Container} from '@/components/common/container'
import {AppCanvas} from '@/components/common/layout/app-canvas'
import {Title} from '@/components/common/elements/title'

export const DashboardPage = () => {
  const showNotification = useNotifications()

  return (
    <Container>
      <AppCanvas>
        <Title>Dashboard</Title>
        <div className="h-screen">
          <button className="block" onClick={() => {
            showNotification({
              type: 'success',
              heading: 'Test-Nachricht',
              text: 'Das hier ist eine mittellange Test-Nachricht, die beim Layouten der Notifications helfen soll.',
              autoRemove: true
            })
          }}
          >
            Success-Notification
          </button>
          <button className="block" onClick={() => {
            showNotification({
              type: 'error',
              heading: 'Test-Nachricht',
              text: 'Das hier ist eine mittellange Test-Nachricht, die beim Layouten der Notifications helfen soll.',
              autoRemove: false
            })
          }}
          >
            Error-Notification
          </button>
          <button className="block" onClick={() => {
            showNotification({
              type: 'info',
              heading: 'Test-Nachricht',
              text: 'Das hier ist eine mittellange Test-Nachricht, die beim Layouten der Notifications helfen soll.',
              autoRemove: true
            })
          }}
          >
            Info-Notification
          </button>
        </div>
      </AppCanvas>
    </Container>
  )
}

export default DashboardPage
