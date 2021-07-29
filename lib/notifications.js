import {createContext, useContext, useState, useEffect, useReducer} from 'react'
import {motion, AnimatePresence} from 'framer-motion'

import {SuccessMessage} from '@/components/elements/success-message'
import {ErrorMessage} from '@/components/elements/error-message'
import {InfoMessage} from '@/components/elements/info-message'

const NotificationContext = createContext()

export const useNotifications = () => {
  return useContext(NotificationContext)
}

export const NotificationProvider = ({children}) => {
  const [notificationCount, setNotificationCount] = useState(0)

  const reducer = (state, action) => {
    switch (action.type) {
      case 'add':
        if(action.notification.autoRemove) {
          setTimeout(() => {removeNotification(notificationCount)}, 4000)
        }
        setNotificationCount(notificationCount + 1)
        return [{id: notificationCount, ...action.notification}, ...state]
      case 'remove':
        return [...state.filter(n => n.id != action.id)]
      default:
        console.log('default...')
    }
  }

  const [notifications, editNotifications] = useReducer(reducer, [])

  const addNotification = ({type, heading, text, autoRemove}) => {
    editNotifications({type: 'add', notification: {type, heading, text, autoRemove}})
  }

  const removeNotification = (id) => {
    editNotifications({type: 'remove', id})
  }

  return (
    <NotificationContext.Provider value={addNotification}>
        {children}
        <ul className="fixed top-12 right-12 w-96 space-y-4">
          <AnimatePresence initial={false}>
            {notifications.map(({id, type, heading, text}) => (
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