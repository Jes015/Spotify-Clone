'use client'
import { globalLoaderStateService } from '@/components/GlobalLoader/services'
import { useEffect, useState } from 'react'

const defaultValues = {
  modalOpen: false
}

export const useGlobalLoader = () => {
  const [isLoaderVisible, setIsLoaderVisible] = useState(defaultValues.modalOpen)

  useEffect(() => {
    globalLoaderStateService.listenEvent(() => {
      toggleLoaderVisibility()
    })

    return () => {
      globalLoaderStateService.removeEvent()
    }
  }, [])

  const toggleLoaderVisibility = () => {
    setIsLoaderVisible(prevState => !prevState)
  }

  return { isLoaderVisible }
}