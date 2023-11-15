import Image from 'next/image'
import styles from './libraryItem.module.css'

interface Props {
  title: string
  subTitle: React.ReactNode
  imageUrl: string
  imageAlt: string
  imageRadius?: string
  selected?: boolean
}
export const LibraryItem: React.FC<Props> = ({ title, subTitle, imageAlt, imageUrl, imageRadius = '0.2rem', selected = false }) => {
  return (
        <div
            className={
                [
                  styles.libraryItem,
                  selected ? styles['libraryItem--selected'] : ''
                ].join(' ')
            }
        >
            {
                imageUrl != null &&
                <Image
                    src={imageUrl ?? 'https://misc.scdn.co/liked-songs/liked-songs-640.png'}
                    alt={imageAlt ?? 'liked song image'}
                    className={styles.libraryItem__image}
                    width={48}
                    height={48}
                    style={{ borderRadius: imageRadius }}
                />
            }
            <div className={styles['libraryItem__data-container']}>
                <header>
                    <h4 className={styles.libraryItem__title}>{title}</h4>
                </header>
                <footer>
                    <span className={styles['libraryItem__desc-data']}>
                        {subTitle}
                    </span>
                </footer>
            </div>
        </div>
  )
}