import router, {useRouter} from 'next/router'

import {useSupabase} from '@/lib/supabase'
import {Submit} from '@/components/forms/submit'

export const ProfileChecklist = () => {
  const supabase = useSupabase()

  const logout = async () => {
    const {error} = await supabase.auth.signOut()
    if(error) {

    } else {
      router.push('/login')
    }
  }

  return (
    <div>
      <p>Moin!</p>
      <form onSubmit={logout} className="w-48 mt-32"><Submit label="Abmelden"/></form>
    </div>
  )
}