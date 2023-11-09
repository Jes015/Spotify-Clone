import { AuthButtons, GoBackForwardNavigation, UserButtons } from '@/components'
import { useGlobalUser } from '@/hooks'
import styles from './header.module.css'

export const Header = () => {
    const { user } = useGlobalUser()
    return (
        <header className={styles.header}>
            <GoBackForwardNavigation />
            {
                user
                    ?
                    (
                        <UserButtons />
                    )
                    :
                    (

                        <AuthButtons />
                    )
            }
        </header>
    )
}
