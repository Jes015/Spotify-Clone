import { userContext } from '@/utils/context'
import { useContext } from 'react'

export const useGlobalUser = () => {
  const newUserContextHook = useContext(userContext)

  if (newUserContextHook == null) {
    throw new Error('useGlobalUser must be used inside a UserProvider')
  }

  return newUserContextHook
}