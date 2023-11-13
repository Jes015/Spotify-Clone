'use client'
import { LibraryIcon, PlusIcon } from '@/assets/Icons'
import { Button } from '@/components'
import { useRouting } from '@/hooks'
import { frontRoutes } from '@/models'
import Link from 'next/link'
import { LibraryItem } from './components/'
import { useUserLibrary } from './hooks'
import styles from './userLibrary.module.css'

export const UserLibrary = () => {
  const { pathname } = useRouting()
  const { openLibraryModal } = useUserLibrary()

  const handleOnClickForOpenLibrary = () => {
    openLibraryModal()
  }
  return (
        <aside className={styles.userLibrary}>
            <header className={styles.userLibrary__header}>
                <div className={styles['userLibrary__title-container']}>
                    <LibraryIcon className="icon" />
                    <h2>Your library</h2>
                </div>
                <div className={styles['userLibrary__actions-container']}>
                    <Button
                        rounded='100'
                        onClick={handleOnClickForOpenLibrary}
                    >
                        <PlusIcon className="icon--md" />
                    </Button>
                </div>
            </header>
            <div className={styles.userLibrary__content}>
                <ul>
                    <li>
                        <Link
                            href={frontRoutes.staticRoutes.likedSongs}
                        >
                            <LibraryItem
                                title='Liked songs'
                                subTitle={
                                    <>
                                        <span>Playlist</span>
                                        •
                                        <span>11 songs</span>
                                    </>
                                }
                                imageUrl='https://misc.scdn.co/liked-songs/liked-songs-640.png'
                                imageAlt='liked song image'
                                selected={frontRoutes.staticRoutes.likedSongs === pathname}
                            />
                        </Link>
                    </li>
                    <li>
                        <LibraryItem
                            title='Bad Bunny'
                            subTitle={
                                <>
                                    <span>Artist</span>
                                </>
                            }
                            imageUrl='https://i.scdn.co/image/ab6761610000e5eb9ad50e478a469448c6f369df'
                            imageAlt='liked song image'
                            imageRadius='100%'
                        />
                    </li>
                </ul>
            </div>
        </aside>
  )
}