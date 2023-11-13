import { useGlobalUser } from '@/hooks'
import { disLikeSong as disLikeSongService, getSongLikeStatus, likeSong as likeSongService } from '@/services'
import { useSupabaseClient } from '@supabase/auth-helpers-react'
import { useEffect, useState } from 'react'

export const useSong = (songId: number) => {
  const [isLiked, setIsLiked] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const { user } = useGlobalUser()
  const supabaseClinet = useSupabaseClient()

  useEffect(() => {
    if (user == null) return
    const asyncExecutionContext = async () => {
      try {
        const { error } = await getSongLikeStatus(supabaseClinet, songId, user?.id)

        setIsLiked(error == null)
      } finally {
        setIsLoading(false)
      }
    }

    void asyncExecutionContext()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user])

  const toggleSongLike = async () => {
    if (isLoading) return

    setIsLoading(true)
    if (!isLiked) {
      console.log('liking')
      await likeSong()
    } else {
      console.log('disliking')
      await disLikeSong()
    }
    setIsLoading(false)
  }

  const likeSong = async () => {
    const { error } = await likeSongService(supabaseClinet, songId, user?.id as string)

    setIsLiked(error == null)
  }

  const disLikeSong = async () => {
    const { error } = await disLikeSongService(supabaseClinet, songId, user?.id as string)

    setIsLiked(!(error == null))
  }

  return { isLiked, isLoading, toggleSongLike }
}