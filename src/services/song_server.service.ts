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