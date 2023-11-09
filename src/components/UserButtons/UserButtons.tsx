import { UserIcon } from '@/assets/Icons'
import { Button } from '@/components'
import { useGlobalUser, useRouting } from '@/hooks'
import { frontRoutes } from '@/models'
import styles from './userButtons.module.css'

export const UserButtons = () => {
  const { signOut } = useGlobalUser()
  const { goTo } = useRouting()

  const handleOnClickForSignOut = () => {
    signOut()
  }

  const handleOnClickForGoToProfile = () => {
    goTo(frontRoutes.staticRoutes.profile)
  }

  return (
    <div className={styles.userButtons}>
      <Button
        onClick={handleOnClickForSignOut}
        rounded="medium"
        variant="solid"
        size2="md"
      >
        Sign out
      </Button>
      <Button
        onClick={handleOnClickForGoToProfile}
        rounded="100"
        size2="md"
      >
        <UserIcon className="icon--xl" />
      </Button>
    </div>
  )
}
