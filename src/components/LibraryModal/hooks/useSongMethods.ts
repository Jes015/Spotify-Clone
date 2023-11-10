import { globalLoaderStateService } from '@/components/GlobalLoader/services'
import { useGlobalUser, useRouting } from '@/hooks'
import { toastUtils } from '@/utils/others'
import { useSessionContext } from '@supabase/auth-helpers-react'

export const useSongMethods = () => {
  const { refresh } = useRouting()
  const { user } = useGlobalUser()
  const { supabaseClient } = useSessionContext()

  const addSong = async (title: string, author: string, imageFile: File, songFile: File) => {
    try {
      globalLoaderStateService.sendMessage()

      if (imageFile == null || songFile == null || user == null) {
        toastUtils.error('Missing fields')
        return
      }

      const uniqueID = crypto.randomUUID()

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
        globalLoaderStateService.sendMessage()
        toastUtils.error('Failed song upload'); return
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
        globalLoaderStateService.sendMessage()
        toastUtils.error('Failed image upload'); return
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
        toastUtils.error(supabaseError.message); return
      }

      refresh()
      globalLoaderStateService.sendMessage()
      toastUtils.success('Song created!')
      reset()
    } catch (error) {
      toastUtils.error('Something went wrong')
    } finally {
      globalLoaderStateService.sendMessage()
    }
  }
  return { addSong }
}