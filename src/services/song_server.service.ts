import { type SongArray } from '@/models'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

export const getAllSong = async () => {
  const supabase = createServerComponentClient({ cookies })

  const { data, error } = await supabase
    .from('songs')
    .select('*')
    .order('created_at', { ascending: false })

  return { data: data as SongArray | null, error }
}

export const getSongByTitle = async (title: string | undefined) => {
  const supabase = createServerComponentClient({ cookies })

  let songsData: SongArray | null = null
  let error = null

  if (title == null) {
    const allSongs = await getAllSong()

    if (allSongs.error == null) {
      songsData = allSongs.data
    } else {
      error = allSongs.error
    }
  } else {
    const { data: songsByTitle, error: songsByTitleError } = await supabase
      .from('songs')
      .select('*')
      .ilike('title', `%${title}%`)
      .order('created_at', { ascending: false })

    if (error == null) {
      songsData = songsByTitle
    } else {
      error = songsByTitleError
    }
  }

  return { data: songsData, error }
}

export const getLikedSongs = async () => {
  const supabase = createServerComponentClient({ cookies })

  const { data: { session } } = await supabase.auth.getSession()

  const { data, error } = await supabase
    .from('liked_songs')
    .select('*, songs(*)')
    .eq('user_id', session?.user?.id)
    .order('created_at', { ascending: false })

  const dataAdapted: SongArray = data != null ? data?.map((item) => ({ ...item.songs })) : []

  return { data: dataAdapted, error }
}