"use client"
import { Modal } from "@/components"
import { useGlobalSupabaseClient } from "@/hooks"
import { Auth } from '@supabase/auth-ui-react'
import {
    ThemeSupa
} from '@supabase/auth-ui-shared'
import { useAuthModal } from "./hooks"

export const AuthModal = () => {
    const { isModalOpen, toggleModalOpen, view } = useAuthModal()

    const supabaseClient = useGlobalSupabaseClient()

    const handleOnChangeOpenModal = () => {
        toggleModalOpen()
    }

    return (
        <Modal
            title="Auth"
            description="Sign in for the best experience"
            isOpen={isModalOpen}
            onChange={handleOnChangeOpenModal}
        >
            <Auth
                magicLink
                supabaseClient={supabaseClient}
                appearance={{ theme: ThemeSupa }}
                providers={['github']}
                theme="dark"
                view={view}
            />

        </Modal>
    )
}