import { Button } from '@/components'
import { AuthModalTypes } from '@/components/AuthModal/models'
import { authModalStateService } from '@/components/AuthModal/services'
import styles from './authButtons.module.css'

export const AuthButtons = () => {
  const handleOnClickForOpenSignInModal = () => {
    authModalStateService.sendMessage({ detail: AuthModalTypes.sign_in })
  }

  const handleOnClickForOpenSignUpModal = () => {
    authModalStateService.sendMessage({ detail: AuthModalTypes.sign_up })
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
