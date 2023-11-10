import { AuthModal, GlobalLoader, LibraryModal } from '@/components'
import { Toaster } from 'sonner'

export const RootComponents = () => {
  return (
        <>
            <LibraryModal />
            <AuthModal />
            <Toaster richColors position='top-center' />
            <GlobalLoader />
        </>
  )
}
