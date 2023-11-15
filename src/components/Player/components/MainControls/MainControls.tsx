import { NextIcon, PauseIcon, PlayIcon, PreviousIcon } from '@/assets/Icons'
import { Button, Slider } from '@/components'
import { authModalStateService } from '@/components/AuthModal/services'
import { formatTime } from '@/components/Player/utils'
import { useGlobalUser } from '@/hooks'
import { useSongPlayerStore } from '@/utils/store'
import styles from './mainControls.module.css'

interface Props {
  changeCurrentSongTime: (newCurrentTime: number) => void
  sliderValue: number
  maxSongTime: number
}

export const MainControls: React.FC<Props> = ({ maxSongTime, sliderValue, changeCurrentSongTime }) => {
  const { user } = useGlobalUser()
  const [currentTime, isPlaying, nextSong, previousSong, toggleIsPlaying, isThereNextSongsInQueue, isTherePreviousSongsInQueue] = useSongPlayerStore(
    state => [state.currentTime, state.isPlaying, state.nextSong, state.previousSong, state.toggleIsPlaying, state.isThereNextSongsInQueue, state.isTherePreviousSongsInQueue]
  )

  const currentSongTime = !isNaN(currentTime) ? formatTime(currentTime) : '0:00'
  const totalSongTime = !isNaN(maxSongTime) ? formatTime(maxSongTime) : '0:00'

  const handleOnClickForTogglePlayStop = () => {
    if (user == null) {
      authModalStateService.sendMessage()
      return
    }

    toggleIsPlaying()
  }
  const handleOnClickForNextSong = () => {
    nextSong()
  }
  const handleOnClickForPreviousSong = () => {
    previousSong()
  }

  const handleOnChangeSlider = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(event.currentTarget.value)

    if (isNaN(newValue)) return

    changeCurrentSongTime(newValue)
  }
  return (
    <div className={styles.mainControls}>
      <div className={styles.mainControls__controls}>
        <Button
          onClick={handleOnClickForPreviousSong}
          rounded='100'
          disabled={isTherePreviousSongsInQueue()}
        >
          <PreviousIcon className='icon--md' />
        </Button>
        <Button onClick={handleOnClickForTogglePlayStop} variant='solid' rounded='100'>
          {
            isPlaying
              ? <PauseIcon className='icon--md' />
              : <PlayIcon className='icon--md' />
          }
        </Button>
        <Button
          onClick={handleOnClickForNextSong}
          rounded='100'
          disabled={isThereNextSongsInQueue()}
        >
          <NextIcon className='icon--md' />
        </Button>
      </div>
      <div className={styles.mainControls__sliderTime}>
        <span
          style={{ justifyContent: 'flex-end' }}
          className={styles['mainControls__song-time']}
        >
          {currentSongTime}
        </span>
        <Slider
          defaultValue={sliderValue}
          value={currentTime}
          onChange={handleOnChangeSlider}
          min={0}
          step={0.05}
          max={maxSongTime}
        />
        <span
          style={{ justifyContent: 'flex-start' }}
          className={styles['mainControls__song-time']}
        >
          {totalSongTime}
        </span>
      </div>
    </div>
  )
}