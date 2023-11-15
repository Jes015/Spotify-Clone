import { Song } from '@/components'
import { useSongPlayerStore } from '@/utils/store'

export const CurrentSong = () => {
  const [getSongByIndex, indexInQueueSong] = useSongPlayerStore(state => [state.getSongByIndex, state.indexInQueueSong])

  const currentSong = getSongByIndex(indexInQueueSong)

  return (
        <Song data={currentSong} type='mini' />
  )
}