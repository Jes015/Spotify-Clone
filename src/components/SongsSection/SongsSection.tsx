'use client'
import { Song } from '@/components'
import { type SongArray } from '@/models'
import { PlayListHeader, SectionHeader } from './components'
import styles from './songsSection.module.css'

interface Props {
  title: string
  songs: SongArray
}

interface PlayListProps extends Props {
  type: 'playlist'
  imageUrl: string
  description: string
}

interface SectionProps extends Props {
  type: 'base'
}

export const SongsSection: React.FC<PlayListProps | SectionProps> = (props) => {
  const Header = props.type === 'playlist'
    ? <PlayListHeader title={props?.title} description={props.description} imageUrl={props.imageUrl} />
    : <SectionHeader title={props?.title} />

  return (
    <section className={styles.songSection}>
      {Header}
      <div className={styles.songSection__container}>
        {
          props.songs[0] != null &&
          (
            props.songs.map((song) => (<Song key={song?.id} data={song} />))
          )
        }

        {
          props.songs[0] == null &&
          (
            'No songs found'
          )
        }
      </div>
    </section>
  )
}
