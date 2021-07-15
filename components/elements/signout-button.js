import {useRouter} from 'next/router'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faSignOutAlt} from '@fortawesome/pro-light-svg-icons'
import {faCaretLeft} from '@fortawesome/pro-solid-svg-icons'

import {useSupabase} from '@/lib/supabase'

export const SignOutButton = () => {
  const supabase = useSupabase()
  const router = useRouter()

  const logout = async () => {
    const {error} = await supabase.auth.signOut()
    if(error) {

    } else {
      router.push('/login')
    }
  }

  return (
    <button onClick={logout} className="group relative w-24 flex justify-center items-center text-3xl text-gray-500 hover:text-gray-800">
      <FontAwesomeIcon icon={faSignOutAlt}/>
      <div className="absolute w-0 overflow-hidden group-hover:w-auto group-hover:overflow-visible">
        <div className="
          flex items-center space-x-1 translate-x-1/3 ml-12 opacity-0 
          transition-all duration-150 group-hover:translate-x-1/2 group-hover:opacity-100
        ">
          <FontAwesomeIcon icon={faCaretLeft} className="text-lg drop-shadow-md"/>
          <span className="inline-block text-xs text-white bg-gray-800 py-0.5 px-2 rounded-lg drop-shadow-md">Abmelden</span>
        </div>
      </div>
    </button>
  )
}