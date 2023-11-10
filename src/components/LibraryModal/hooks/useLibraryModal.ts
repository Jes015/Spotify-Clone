'use client'
import { libraryModalStateService } from '@/components/LibraryModal/services'
import { useGlobalUser } from '@/hooks'
import { useEffect, useState } from 'react'

const defaultValues = {
  modalOpen: false
}

export const useLibraryModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(defaultValues.modalOpen)

  const { user } = useGlobalUser()

  useEffect(() => {
    if (user != null) {
      setIsModalOpen(false)
    }
  }, [user])

  useEffect(() => {
    libraryModalStateService.listenEvent(() => {
      toggleModalOpen()
    })

    return () => {
      libraryModalStateService.removeEvent()
    }
  }, [])

  const toggleModalOpen = () => {
    setIsModalOpen(prevState => !prevState)
  }

  return { isModalOpen, toggleModalOpen }
}