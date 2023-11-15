import { type Song, type SongArray } from '@/models'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface SongPlayer {
  currentTime: number
  isLoadingSong: boolean
  isPlaying: boolean
  indexInQueueSong: number
  queueSongs: SongArray
  setCurrentTime: (newTime: number) => void
  setIsLoadingSong: (loading: boolean) => void
  setActualSong: (newSongIndex: number) => void
  setSongsInQueue: (songs: SongArray) => void
  volume: number
  setVolume: (volume: number) => void
  pushToQueue: (song: Song) => number
  pushToQueueAndSet: (song: Song) => void
  setIsPlaying: (newPlayingValue: boolean) => void
  toggleIsPlaying: (newValue?: boolean) => void
  getSongByIndex: (songIndex: number) => Song
  nextSong: () => void
  previousSong: () => void
  isThereNextSongsInQueue: () => boolean
  isTherePreviousSongsInQueue: () => boolean
}

export const useSongPlayerStore = create(
  persist<SongPlayer>(
    (set, get) => ({
      currentTime: 0,
      volume: 1,
      isLoadingSong: false,
      isPlaying: false,
      indexInQueueSong: 0,
      queueSongs: [],
      setCurrentTime: (newTime) => { set({ currentTime: newTime }) },
      setIsLoadingSong: (loading) => { set({ isLoadingSong: loading }) },
      setIsPlaying: (newPlayingValue) => { set({ isPlaying: newPlayingValue }) },
      toggleIsPlaying: (newValue) => { set({ isPlaying: newValue ?? !get().isPlaying }) },
      setActualSong: (newSongIndex) => {
        set({ indexInQueueSong: newSongIndex })
      },
      setSongsInQueue: (queueSongs: SongArray) => {
        set({ queueSongs, indexInQueueSong: 0 })
      },
      nextSong: () => {
        if (get().getSongByIndex(0) == null) return

        const nextSongIndex = get().indexInQueueSong + 1

        if (nextSongIndex === get().queueSongs.length) return

        get().setActualSong(nextSongIndex)
      },
      previousSong: () => {
        if (get().getSongByIndex(0) == null) return

        const nextSongIndex = get().indexInQueueSong - 1

        if (nextSongIndex === -1) return

        get().setActualSong(nextSongIndex)
      },
      setVolume: (volume: number) => { set({ volume }) },
      pushToQueue: (song) => {
        const filteredSongs = [...get().queueSongs].filter((tempSong) => tempSong.id !== song.id)
        const newSongs = [...filteredSongs, song]
        set({ queueSongs: newSongs })
        return newSongs.length - 1
      },
      pushToQueueAndSet: (song) => {
        const songIndex = get().pushToQueue(song)
        get().setActualSong(songIndex)
      },
      getSongByIndex: (songIndex) => {
        const song = get().queueSongs[songIndex]
        return song
      },
      isThereNextSongsInQueue: () => {
        return get().indexInQueueSong + 1 === get().queueSongs.length
      },
      isTherePreviousSongsInQueue: () => {
        return get().indexInQueueSong - 1 === -1
      }
    }),
    {
      name: 'songPlayerStorage',
      partialize: (state) =>
        Object.fromEntries(
          Object.entries(state).filter(([key]) => !['isPlaying'].includes(key))
        ) as SongPlayer
    }
  )
)