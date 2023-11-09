"use client"
import { ModalType, ModalTypes } from "@/app/(home)/components/AuthModal/models"
import { authModalStateService } from "@/app/(home)/components/AuthModal/services"
import { useEffect, useState } from "react"

const defaultValues = {
    modalOpen: false,
    view: ModalTypes.sign_in
}
export const useAuthModal = () => {
    const [isModalOpen, setIsModalOpen] = useState(defaultValues.modalOpen)
    const [view, setView] = useState<ModalType>(defaultValues.view)

    useEffect(() => {
        authModalStateService.listenEvent((data) => {
            if (data != null && 'detail' in data && (data.detail === ModalTypes.sign_in || data.detail === ModalTypes.sign_up)) {
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