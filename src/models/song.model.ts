export interface Song {
  author: string
  created_at: string
  id: number
  image_path: string
  song_path: string
  title: string
  user_id: string
}

export type SongArray = Song[]