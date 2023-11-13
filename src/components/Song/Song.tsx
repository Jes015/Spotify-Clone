'use client'
import { HeartIcon, HeartOutlinedIcon, PlayIcon } from '@/assets/Icons'
import { Button } from '@/components'
import { useSongMethods } from '@/hooks'
import { type Song as SongType } from '@/models'
import Image from 'next/image'
import { useSong } from './hooks'
import styles from './song.module.css'

interface Props {
  data: SongType
}

export const Song: React.FC<Props> = ({ data }) => {
  const { isLiked, toggleSongLike } = useSong(data.id)
  const { loadSongImage } = useSongMethods()
  const songImage = loadSongImage(data.image_path)

  const handleOnClickForToggleSongLike = () => {
    void toggleSongLike()
  }
  return (
    <article className={styles.song}>
      <header className={styles.song__header}>
        <Image
          className={styles.song__image}
          src={songImage as string}
          alt={`${data.title} of ${data.author}`}
          width={20}
          height={20}
        />
        <div className={styles['song__play-button-container']}>
          <Button
            variant='solid'
            color='green'
            rounded='100'
            className={styles['song__play-button']}
          >
            <PlayIcon className='icon--xl' />
          </Button>
        </div>
      </header>
      <footer className={styles.song__footer}>
        <div className={styles.song__data}>
          <span className={styles.song__title}>
            {data.title}
          </span>
          <span className={styles.song__author}>
            {data.author}
          </span>
        </div>
        <div>
          <Button
            rounded='100'
            onClick={handleOnClickForToggleSongLike}
          >
            {
              isLiked
                ? <HeartIcon className={['icon--2xl', styles['song__like-icon--liked']].join(' ')} />
                : <HeartOutlinedIcon className='icon--2xl' />
            }

          </Button>
        </div>
      </footer>
    </article>
  )
}
