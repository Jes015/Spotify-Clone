import { AuthModalTypes } from '@/components/AuthModal/models'
import { authModalStateService } from '@/components/AuthModal/services'
import { libraryModalStateService } from '@/components/LibraryModal/services'
import { useGlobalUser } from '@/hooks'

export const useUserLibrary = () => {
  const { user } = useGlobalUser()

  const openLibraryModal = () => {
    if (user == null) {
      authModalStateService.sendMessage({ detail: AuthModalTypes.sign_in })
    } else {
      libraryModalStateService.sendMessage()
    }
  }

  return { openLibraryModal }
}