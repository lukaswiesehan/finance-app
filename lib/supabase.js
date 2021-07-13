import {createContext, useContext} from 'react'
import {createClient} from '@supabase/supabase-js'

const SupabaseContext = createContext()

export const useSupabase = () => {
  return useContext(SupabaseContext)
}

export const SupabaseProvider = ({children}) => {
  const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_KEY)

  return (
    <SupabaseContext.Provider value={supabase}>
      {children}
    </SupabaseContext.Provider>
  )
}