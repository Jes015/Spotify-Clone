import Image from 'next/image'
import styles from './libraryItem.module.css'

export const LibraryItem = () => {
  return (
        <div className={styles.libraryItem}>
            <Image
                src='https://misc.scdn.co/liked-songs/liked-songs-640.png'
                alt="liked song image"
                className={styles.libraryItem__image}
                width={48}
                height={48}
            />
            <div className={styles['libraryItem__data-container']}>
                <header>
                    <h4 className={styles.libraryItem__title}>Liked songs</h4>
                </header>
                <footer>
                    <span className={styles['libraryItem__desc-data']}>
                        <span>Playlist</span>
                        •
                        <span>11 songs</span>
                    </span>
                </footer>
            </div>
        </div>
  )
}