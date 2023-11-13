import { SongsSection } from '@/components/SongsSection/SongsSection'
import { getLikedSongs } from '@/services/song_server.service'

export const revalidate = 0

const LikedSongs = async () => {
  const likedSongs = await getLikedSongs()

  return (
        <div>
            <SongsSection
                type='playlist'
                title='Liked songs'
                description='Enjoy your preferred songs <3'
                imageUrl='https://misc.scdn.co/liked-songs/liked-songs-640.png'
                songs={likedSongs.data}
            />
        </div>
  )
}

export default LikedSongs