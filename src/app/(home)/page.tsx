"use client"
import Button from "@/components/ui/Button/CustomButton"
import { ModalTypes } from "./components/AuthModal/models"
import { authModalStateService } from "./components/AuthModal/services"
import styles from './home.module.css'

export default function Home() {

  const handleOnClickForOpenSignInModal = () => {
    authModalStateService.sendMessage({ detail: ModalTypes.sign_in })
  }

  const handleOnClickForOpenSignUpModal = () => {
    authModalStateService.sendMessage({ detail: ModalTypes.sign_up })
  }

  return (
    <div>
      <header className={styles.home__header}>
        <div className={styles['home__header-buttons']}>
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
      </header>
    </div>
  )
}
