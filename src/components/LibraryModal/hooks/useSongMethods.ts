import { useGlobalUser } from '@/hooks'
import { useSessionContext } from '@supabase/auth-helpers-react'

export const useSongMethods = () => {
  const { user } = useGlobalUser()
  const { supabaseClient } = useSessionContext()

  const addSong = async (title: string, author: string, imageFile: File, songFile: File) => {
    return await new Promise((resolve, reject) => {
      if (imageFile == null || songFile == null || user == null) {
        reject(new Error('Missing fields'))
        return
      }

      const uniqueID = crypto.randomUUID()

      const uploadSong = async () => {
        // Upload song
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

        if (songError != null) {
          throw new Error('Failed song upload')
        }

        // Upload image
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

        if (imageError != null) {
          throw new Error('Failed image upload')
        }

        // Create record
        const { error: supabaseError } = await supabaseClient
          .from('songs')
          .insert({
            user_id: user.id,
            title,
            author,
            image_path: imageData.path,
            song_path: songData.path
          })

        if (supabaseError != null) {
          throw new Error(supabaseError.message)
        }
      }

      uploadSong()
        .then(() => {
          resolve('Song added')
        })
        .catch((error) => {
          reject(error)
        })
    })
  }
  return { addSong }
}