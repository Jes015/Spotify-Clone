import { authModalStateService } from '@/components/AuthModal/services'
import { useGlobalUser } from '@/hooks'
import { disLikeSong as disLikeSongService, getSongLikeStatus, likeSong as likeSongService } from '@/services'
import { useSupabaseClient } from '@supabase/auth-helpers-react'
import { useEffect, useState } from 'react'

export const useSongLike = (songId: number) => {
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
  }, [user, songId, supabaseClinet])

  const toggleSongLike = async () => {
    if (isLoading || user == null) {
      authModalStateService.sendMessage()
      return
    }

    setIsLoading(true)
    if (!isLiked) {
      await likeSong()
    } else {
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