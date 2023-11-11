'use client'
import { PlayIcon } from '@/assets/Icons'
import { Button } from '@/components'
import { useSongMethods } from '@/hooks'
import { type Song as SongType } from '@/models'
import Image from 'next/image'
import styles from './song.module.css'

interface Props {
  data: SongType
}

export const Song: React.FC<Props> = ({ data }) => {
  const { loadSongImage } = useSongMethods()
  const songImage = loadSongImage(data.image_path)

  return (
    <article className={styles.song}>
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
      <header className={styles.song__header}>
        <Image
          className={styles.song__image}
          src={songImage as string}
          alt={`${data.title} of ${data.author}`}
          width={20}
          height={20}
        />
      </header>
      <footer className={styles.song__footer}>
        <span className={styles.song__title}>
          {data.title}
        </span>
        <span className={styles.song__author}>
          {data.author}
        </span>
      </footer>
    </article>
  )
}
