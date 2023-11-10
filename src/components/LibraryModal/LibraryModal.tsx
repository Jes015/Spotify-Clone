'use client'
import { Modal } from '@/components'
import { LibraryModalForm } from './components'
import { useLibraryModal } from './hooks'

export const LibraryModal = () => {
  const { isModalOpen, toggleModalOpen } = useLibraryModal()

  return (
        <Modal
            title="Add songs"
            description="Upload your songs"
            isOpen={isModalOpen}
            onChange={toggleModalOpen}
        >
            <LibraryModalForm />
        </Modal>
  )
}
