import { AuthButtons, GoBackForwardNavigation } from '@/app/(home)/components/'
import styles from './header.module.css'

export const Header = () => {
    return (
        <header className={styles.header}>
            <GoBackForwardNavigation />
            <AuthButtons />
        </header>
    )
}
