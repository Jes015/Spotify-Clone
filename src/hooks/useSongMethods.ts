import { useGlobalUser } from '@/hooks'
import { loadSongImageService, uploadSongEntry, uploadSongFile, uploadSongImage } from '@/services'
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
        const { songData, songError } = await uploadSongFile(supabaseClient, title, uniqueID, songFile)

        if (songError != null) {
          throw new Error('Failed song upload')
        }

        // Upload image
        const { imageData, imageError } = await uploadSongImage(supabaseClient, title, uniqueID, imageFile)

        if (imageError != null) {
          throw new Error('Failed image upload')
        }

        // Create record
        const { supabaseError } = await uploadSongEntry(supabaseClient, title, user?.id, author, imageData?.path as string, songData?.path as string)

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

  const loadSongImage = (songPath: string | null) => {
    const songImageUrl = loadSongImageService(supabaseClient, songPath)

    return songImageUrl
  }
  return { addSong, loadSongImage }
}