import { SongsSection } from '@/components/SongsSection/SongsSection'
import { getAllSong } from '@/services/song_server.service'
import { type Metadata } from 'next'
import styles from './home.module.css'

export const metadata: Metadata = {
  title: 'Spotify Clone',
  description: 'Listen to your favorite songs <3'
}

export const revalidate = 0

export default async function Home () {
  const songs = await getAllSong()
  return (
    <div className={styles.home}>
      {
        songs.data != null
          ? <SongsSection title='Latest songs' songs={songs.data} />
          : <h3>No songs available</h3>
      }

    </div>
  )
}
