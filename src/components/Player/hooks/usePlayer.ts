'use client'
import { useGlobalUser } from '@/hooks'
import { useSongPlayerStore } from '@/utils/store'
import { useSupabaseClient } from '@supabase/auth-helpers-react'
import { useEffect, useRef } from 'react'
import { formatTime } from '../utils'

export const usePlayer = () => {
  const [queueSongs, indexInQueueSong, setIsLoadingSong, isPlaying, setCurrentTime, setVolume] = useSongPlayerStore(
    (state) => [state.queueSongs, state.indexInQueueSong, state.setIsLoadingSong, state.isPlaying, state.setCurrentTime, state.setVolume]
  )
  const audioElement = useRef(new Audio())
  const supabaseClient = useSupabaseClient()
  const { user } = useGlobalUser()

  useEffect(() => {
    const onTimeUpdate = () => {
      setCurrentTime(audioElement.current.currentTime)
    }
    audioElement.current.addEventListener('timeupdate', onTimeUpdate)

    return () => {
      audioElement.current.removeEventListener('timeupdate', onTimeUpdate)
    }
  }, [])

  useEffect(() => {
    const actualSong = queueSongs?.[indexInQueueSong]
    if (actualSong == null || user == null) return
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
      audioElement.current.removeEventListener('canplay', onCanPlay)
      audioElement.current.removeEventListener('loadstart', onLoadStart)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queueSongs, indexInQueueSong, user])

  useEffect(() => {
    if (isPlaying) {
      void audioElement.current.play()
    } else {
      audioElement.current.pause()
    }
  }, [isPlaying, queueSongs, indexInQueueSong])

  const changeCurrentSongTime = (newCurrentTime: number) => {
    audioElement.current.currentTime = newCurrentTime
    setCurrentTime(newCurrentTime)
  }

  const changeVolume = (newVolumeValue: number) => {
    setVolume(newVolumeValue)
    audioElement.current.volume = newVolumeValue
  }

  const currentSongTime = formatTime(0)
  const maxSongTime = audioElement.current.duration

  return { maxSongTime, currentSongTime, changeCurrentSongTime, changeVolume }
}