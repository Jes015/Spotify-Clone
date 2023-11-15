import { CurrentSong, MainControls, SideRightControls } from './components'
import { usePlayer } from './hooks'
import styles from './player.module.css'

export const Player = () => {
  const { maxSongTime, changeCurrentSongTime, changeVolume } = usePlayer()

  return (
    <div className={styles.player}>
      <CurrentSong />
      <MainControls
        sliderValue={0}
        {...{ maxSongTime, changeCurrentSongTime }}
      />
      <SideRightControls {... { changeVolume }} />
    </div>
  )
}