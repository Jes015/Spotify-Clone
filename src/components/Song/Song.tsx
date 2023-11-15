'use client'
import { HeartIcon, HeartOutlinedIcon, PauseIcon, PlayIcon } from '@/assets/Icons'
import { Button, CircleLoader } from '@/components'
import { authModalStateService } from '@/components/AuthModal/services'
import { useGlobalUser, useSongMethods } from '@/hooks'
import { type Song as SongType } from '@/models'
import { useSongPlayerStore } from '@/utils/store'
import Image from 'next/image'
import { useSongLike } from './hooks'
import styles from './song.module.css'

interface Props {
  type?: 'default' | 'mini'
  data: SongType
}

export const Song: React.FC<Props> = ({ data, type = 'default' }) => {
  const { user } = useGlobalUser()
  const { isLiked, toggleSongLike } = useSongLike(data.id)
  const { loadSongImage } = useSongMethods()
  const songImage = loadSongImage(data.image_path)
  const [queueSongs, isPlaying, toggleIsPlaying, pushToQueueAndSet, isLoadingSong, indexInQueueSong] = useSongPlayerStore(
    state => [
      state.queueSongs,
      state.isPlaying,
      state.toggleIsPlaying,
      state.pushToQueueAndSet,
      state.isLoadingSong,
      state.indexInQueueSong
    ]
  )

  const lastSong = queueSongs[indexInQueueSong]
  const isThisTheCurrentSong = lastSong?.id === data.id

  const handleOnClickForToggleSongLike = () => {
    void toggleSongLike()
  }

  const handleOnClickForPlaySong = () => {
    if (user == null) {
      authModalStateService.sendMessage()
      return
    }

    if (!isThisTheCurrentSong) {
      pushToQueueAndSet(data)
      toggleIsPlaying(true)
    } else {
      toggleIsPlaying()
    }
  }

  return (
    <article className={
      [
        styles.song,
        type === 'default' ? styles['song--default'] : '',
        type === 'mini' ? styles['song--mini'] : ''
      ].join(' ')
    }>
      <header className={styles.song__header}>
        <Image
          className={
            [
              styles.song__image,
              type === 'default' ? styles['song__image--default'] : '',
              type === 'mini' ? styles['song__image--mini'] : '',
              (isLoadingSong && isThisTheCurrentSong) ? styles['song__image--loading'] : ''
            ].join(' ')
          }
          src={songImage as string}
          alt={`${data.title} of ${data.author}`}
          width={150}
          height={150}
        />
        {
          type === 'default' &&
          (
            <div className={styles['song__play-button-container']}>
              <Button
                variant='solid'
                color='green'
                rounded='100'
                className={styles['song__play-button']}
                onClick={handleOnClickForPlaySong}
              >
                {
                  isPlaying && isThisTheCurrentSong
                    ? <PauseIcon className='icon--xl' />
                    : <PlayIcon className='icon--xl' />
                }
              </Button>
            </div>
          )
        }
        {
          (isLoadingSong && isThisTheCurrentSong) &&
          (
            <div className={styles['song__loader-container']}>
              <CircleLoader />
            </div>
          )
        }
      </header>
      <footer className={[
        styles.song__footer,
        type === 'default' ? styles['song__footer--default'] : '',
        type === 'mini' ? styles['song__footer--mini'] : ''
      ].join(' ')
      }>
        <div className={styles.song__data}>
          <span className={
            [
              styles.song__title,
              type === 'default' ? styles['song__title--default'] : '',
              type === 'mini' ? styles['song__title--mini'] : ''
            ].join(' ')
          }>
            {data.title}
          </span>
          <span className={
            [
              styles.song__author,
              type === 'default' ? styles['song__author--default'] : '',
              type === 'mini' ? styles['song__author--mini'] : ''
            ].join(' ')
          }>
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
                ? <HeartIcon className={
                  [
                    type === 'default' ? 'icon--2xl' : '',
                    type === 'mini' ? 'icon--md' : '',
                    styles['song__like-icon--liked']
                  ].join(' ')
                }
                />
                : <HeartOutlinedIcon className={
                  [
                    type === 'default' ? 'icon--2xl' : '',
                    type === 'mini' ? 'icon--md' : ''
                  ].join(' ')
                }
                />
            }

          </Button>
        </div>
      </footer>
    </article>
  )
}
