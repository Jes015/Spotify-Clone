import { SongsSection } from '@/components/SongsSection/SongsSection'
import { type SongArray } from '@/models'
import { getSongByTitle } from '@/services/song_server.service'
import { TextFieldSearch } from './components'
import styles from './search.module.css'
interface SearchParams {
  title: string
}
interface Props {
  searchParams: SearchParams
}

const SearchPage: React.FC<Props> = async ({ searchParams }) => {
  const songs = await getSongByTitle(searchParams.title)

  return (
    <div className={styles.searchPage}>
      <TextFieldSearch error={songs.error?.message ?? ''} />
      <SongsSection title='Results' songs={songs.data as SongArray} />
    </div>
  )
}

export default SearchPage
