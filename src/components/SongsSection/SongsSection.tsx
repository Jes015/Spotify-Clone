'use client'
import { Song } from '@/components'
import { type SongArray } from '@/models'
import styles from './songsSection.module.css'

interface Props {
  title: string
  songs: SongArray
}
export const SongsSection: React.FC<Props> = ({ title, songs }) => {
  return (
    <section >
      <header>
        <h3 className={styles.songSection__title}>{title}</h3>
      </header>
      <div className={styles.songSection__container}>
        {
          songs[0] != null &&
          (
            songs.map((song) => (<Song key={song.id} data={song} />))
          )
        }

        {
          songs[0] == null &&
          (
            'No songs found'
          )
        }
      </div>
    </section>
  )
}
