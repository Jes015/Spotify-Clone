'use client'
import { Song } from '@/components'
import { type SongArray } from '@/models'
import styles from './latestSongs.module.css'

interface Props {
  songs: SongArray
}
export const LatestSongs: React.FC<Props> = ({ songs }) => {
  return (
    <section className={styles.latestSongs}>
      {
        songs.map((song) => (<Song key={song.id} data={song} />))
      }
    </section>
  )
}
