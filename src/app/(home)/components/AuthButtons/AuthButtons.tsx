import { ModalTypes } from "@/app/(home)/components/AuthModal/models"
import { authModalStateService } from "@/app/(home)/components/AuthModal/services"
import { Button } from "@/components"
import styles from './authButtons.module.css'

export const AuthButtons = () => {
    const handleOnClickForOpenSignInModal = () => {
        authModalStateService.sendMessage({ detail: ModalTypes.sign_in })
    }

    const handleOnClickForOpenSignUpModal = () => {
        authModalStateService.sendMessage({ detail: ModalTypes.sign_up })
    }
    return (
        <div className={styles.authButtons}>
            <Button
                rounded="medium"
                onClick={handleOnClickForOpenSignUpModal}
            >
                Sign up
            </Button>
            <Button
                rounded="medium"
                variant="solid"
                onClick={handleOnClickForOpenSignInModal}
            >
                Sign in
            </Button>
        </div>
    )
}
