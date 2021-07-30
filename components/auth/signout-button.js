import {useRouter} from 'next/router'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faSignOutAlt} from '@fortawesome/pro-duotone-svg-icons'

import {useSupabase} from '@/lib/supabase'
import {useNotifications} from '@/lib/notifications'

export const SignOutButton = () => {
  const supabase = useSupabase()
  const showNotification = useNotifications()
  const router = useRouter()

  const logout = async () => {
    try {
      const {error} = await supabase.auth.signOut()
      if(error) throw error
      router.push('/login')
    } catch(error) {
      showNotification({type: 'error', heading: `Fehler ${error.code}`, text: error.message})
    }
  }

  return (
    <button onClick={logout} className="transition-none hover:transition-none text-2xl text-gray-400 hover:text-gray-500">
      <FontAwesomeIcon icon={faSignOutAlt} className="block"/>
    </button>
  )
}