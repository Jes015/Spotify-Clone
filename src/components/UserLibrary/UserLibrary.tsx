import { LibraryIcon, PlusIcon } from "@/assets/Icons"
import { Button } from "@/components"
import { LibraryItem } from "./components/LibraryItem/LibraryItem"
import styles from './userLibrary.module.css'

export const UserLibrary = () => {
    return (
        <aside className={styles.userLibrary}>
            <header className={styles.userLibrary__header}>
                <div className={styles['userLibrary__title-container']}>
                    <LibraryIcon className="icon" />
                    <h2>Your library</h2>
                </div>
                <div className={styles['userLibrary__actions-container']}>
                    <Button rounded='100'>
                        <PlusIcon className="icon--md" />
                    </Button>
                </div>
            </header>
            <div className={styles.userLibrary__content}>
                <ul>
                    {
                        Array(15).fill(null).map((_, index) => (
                            <li key={index}>
                                <LibraryItem />
                            </li>
                        ))
                    }
                </ul>
            </div>
        </aside>
    )
}