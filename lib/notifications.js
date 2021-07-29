import {createContext, useContext, useState, useEffect} from 'react'
import {motion, AnimatePresence} from 'framer-motion'

import {SuccessMessage} from '@/components/elements/success-message'
import {ErrorMessage} from '@/components/elements/error-message'
import {InfoMessage} from '@/components/elements/info-message'

const NotificationContext = createContext()

export const useNotifications = () => {
  return useContext(NotificationContext)
}

export const NotificationProvider = ({children}) => {
  const [notifications, setNotifications] = useState([])
  const [notificationCount, setNotificationCount] = useState(0)
 
  const showNotification = ({type, heading, text}) => {
    setNotifications([{id: notificationCount, type, heading, text}, ...notifications])
    setNotificationCount(notificationCount + 1)
  }

  const removeNotification = (id) => {
    setNotifications(notifications.filter(n => n.id != id))
  }

  return (
    <NotificationContext.Provider value={showNotification}>
        {children}
        <ul className="fixed top-12 right-12 w-96 space-y-4">
          <AnimatePresence>
            {notifications.map(({id, type, heading, text, timestamp}) => (
              <motion.li
                key={id}
                layout
                initial={{opacity: 0, x: 100, scale: 0.9}}
                animate={{opacity: 1, x: 0, scale: 1}}
                exit={{opacity: 0, x: 100, scale: 0.9, transition: {duration: 0.1}}}
              >
                {type == 'success' && <SuccessMessage heading={heading} text={text} handleClose={() => {removeNotification(id)}}/>}
                {type == 'error' && <ErrorMessage heading={heading} text={text} handleClose={() => {removeNotification(id)}}/>}
                {type == 'info' && <InfoMessage heading={heading} text={text} handleClose={() => {removeNotification(id)}}/>}
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>
    </NotificationContext.Provider>
  )
}