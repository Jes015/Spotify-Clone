'use client'
import { AuthModalTypes, type ModalType } from '@/components/AuthModal/models'
import { authModalStateService } from '@/components/AuthModal/services'
import { useGlobalUser } from '@/hooks'
import { useEffect, useState } from 'react'

const defaultValues = {
  modalOpen: false,
  view: AuthModalTypes.sign_in
}

export const useAuthModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(defaultValues.modalOpen)
  const [view, setView] = useState<ModalType>(defaultValues.view)

  const { user } = useGlobalUser()

  useEffect(() => {
    if (user != null) {
      setIsModalOpen(false)
    }
  }, [user])

  useEffect(() => {
    authModalStateService.listenEvent((data) => {
      // @ts-expect-error should verify that data has detail key
      if (data != null && 'detail' in data && (data.detail === AuthModalTypes.sign_in || data.detail === AuthModalTypes.sign_up)) {
        setView(data.detail)
      }
      toggleModalOpen()
    })

    return () => {
      authModalStateService.removeEvent()
    }
  }, [])

  const toggleModalOpen = () => {
    setIsModalOpen(prevState => !prevState)
  }

  return { isModalOpen, toggleModalOpen, view }
}