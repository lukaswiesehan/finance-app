import {createContext, useContext} from 'react'

const SupabaseContext = createContext()

export const useSupabase = () => {
  return useContext(SupabaseContext)
}

export const SupabaseProvider = ({value, children}) => {
  return (
    <SupabaseContext.Provider value={value}>
      {children}
    </SupabaseContext.Provider>
  )
}