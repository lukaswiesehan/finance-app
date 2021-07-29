import {useNotifications} from '@/lib/notifications'
import {Container} from '@/components/container'
import {AppCanvas} from '@/components/layout/app-canvas'
import {Title} from '@/components/elements/title'

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
              text: 'Das hier ist eine mittellange Test-Nachricht, die beim Layouten der Notifications helfen soll.'
            })
          }}
          >
            Success-Notification
          </button>
          <button className="block" onClick={() => {
            showNotification({
              type: 'error',
              heading: 'Test-Nachricht',
              text: 'Das hier ist eine mittellange Test-Nachricht, die beim Layouten der Notifications helfen soll.'
            })
          }}
          >
            Error-Notification
          </button>
          <button className="block" onClick={() => {
            showNotification({
              type: 'info',
              heading: 'Test-Nachricht',
              text: 'Das hier ist eine mittellange Test-Nachricht, die beim Layouten der Notifications helfen soll.'
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
