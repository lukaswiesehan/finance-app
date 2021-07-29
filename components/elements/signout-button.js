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
    <button onClick={logout} className="w-6 h-6 flex justify-center items-center rounded-md text-white  bg-gradient-to-br from-pink-400 to-rose-500 border border-rose-500 ring-2 ring-offset-2 ring-offset-gray-100 ring-transparent hover:ring-gray-300">
      <FontAwesomeIcon icon={faSignOutAlt} className="text-sm"/>
    </button>
  )
}