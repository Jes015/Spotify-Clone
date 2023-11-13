import { type SupabaseClient } from '@supabase/auth-helpers-react'

export const uploadSongFile = async (supabaseClient: SupabaseClient, title: string, uniqueID: string, songFile: File) => {
  const {
    data: songData,
    error: songError
  } = await supabaseClient
    .storage
    .from('songs')
    .upload(`song-${title}-${uniqueID}`, songFile, {
      cacheControl: '3600',
      upsert: false
    })

  return { songData, songError }
}
export const uploadSongImage = async (supabaseClient: SupabaseClient, title: string, uniqueID: string, imageFile: File) => {
  const {
    data: imageData,
    error: imageError
  } = await supabaseClient
    .storage
    .from('images')
    .upload(`image-${title}-${uniqueID}`, imageFile, {
      cacheControl: '3600',
      upsert: false
    })

  return { imageData, imageError }
}
export const uploadSongEntry = async (supabaseClient: SupabaseClient, title: string, userId: string, author: string, imagePath: string, songPath: string) => {
  const { error: supabaseError } = await supabaseClient
    .from('songs')
    .insert({
      user_id: userId,
      title,
      author,
      image_path: imagePath,
      song_path: songPath
    })

  return { supabaseError }
}

export const loadSongImageService = (supabaseClient: SupabaseClient, songImagePath: string | null) => {
  let newPublicUrl: string | null = null

  if (songImagePath != null) {
    const { data: { publicUrl } } = supabaseClient.storage.from('images').getPublicUrl(songImagePath)
    newPublicUrl = publicUrl
  }
  return newPublicUrl
}

export const likeSong = async (supabaseClient: SupabaseClient, songId: number, userId: string) => {
  const { error } = await supabaseClient
    .from('liked_songs')
    .insert({
      song_id: songId,
      user_id: userId
    })

  return { error }
}

export const disLikeSong = async (supabaseClient: SupabaseClient, songId: number, userId: string) => {
  const { error } = await supabaseClient
    .from('liked_songs')
    .delete()
    .eq('user_id', userId)
    .eq('song_id', songId)

  return { error }
}

export const getSongLikeStatus = async (supabaseClient: SupabaseClient, songId: number, userId: string) => {
  const { error } = await supabaseClient
    .from('liked_songs')
    .select('*')
    .eq('user_id', userId)
    .eq('song_id', songId)
    .single()

  return { error }
}