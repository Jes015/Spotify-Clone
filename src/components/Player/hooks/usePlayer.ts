'use client'
import { useGlobalUser } from '@/hooks'
import { useSongPlayerStore } from '@/utils/store'
import { useSupabaseClient } from '@supabase/auth-helpers-react'
import { useEffect, useRef } from 'react'

export const usePlayer = () => {
  const [queueSongs, indexInQueueSong, setIsLoadingSong, isPlaying, setCurrentTime, setVolume] = useSongPlayerStore(
    (state) => [state.queueSongs, state.indexInQueueSong, state.setIsLoadingSong, state.isPlaying, state.setCurrentTime, state.setVolume]
  )
  const audioElement = useRef<undefined | HTMLAudioElement>()
  const supabaseClient = useSupabaseClient()
  const { user } = useGlobalUser()

  useEffect(() => {
    audioElement.current = new Audio()

    const onTimeUpdate = () => {
      if (audioElement.current == null) return
      setCurrentTime(audioElement.current.currentTime)
    }
    audioElement.current.addEventListener('timeupdate', onTimeUpdate)

    return () => {
      if (audioElement.current == null) return
      // eslint-disable-next-line react-hooks/exhaustive-deps
      audioElement.current.removeEventListener('timeupdate', onTimeUpdate)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const actualSong = queueSongs?.[indexInQueueSong]
    if (actualSong == null || user == null || audioElement.current == null) return
    console.log({ actualSong })

    audioElement.current.src = supabaseClient.storage.from('songs').getPublicUrl(actualSong.song_path).data.publicUrl

    const onLoadStart = () => {
      setIsLoadingSong(true)
    }

    const onCanPlay = () => {
      setIsLoadingSong(false)
    }

    audioElement.current.addEventListener('loadstart', onLoadStart)
    audioElement.current.addEventListener('canplay', onCanPlay)

    return () => {
      if (audioElement.current == null) return
      audioElement.current.removeEventListener('canplay', onCanPlay)
      // eslint-disable-next-line react-hooks/exhaustive-deps
      audioElement.current.removeEventListener('loadstart', onLoadStart)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queueSongs, indexInQueueSong, user])

  useEffect(() => {
    if (audioElement.current == null) return

    if (isPlaying) {
      void audioElement.current.play()
    } else {
      audioElement.current.pause()
    }
  }, [isPlaying, queueSongs, indexInQueueSong])

  const changeCurrentSongTime = (newCurrentTime: number) => {
    if (audioElement.current == null) return
    audioElement.current.currentTime = newCurrentTime
    setCurrentTime(newCurrentTime)
  }

  const changeVolume = (newVolumeValue: number) => {
    if (audioElement.current == null) return
    setVolume(newVolumeValue)
    audioElement.current.volume = newVolumeValue
  }

  const maxSongTime = audioElement.current?.duration ?? 0

  return { maxSongTime, changeCurrentSongTime, changeVolume }
}