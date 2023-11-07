import { CurrentSong, MainControls, SideRightControls } from './components'
import styles from './player.module.css'

export const Player = () => {
    return (
        <div className={styles.player}>
            <CurrentSong />
            <MainControls />
            <SideRightControls />
        </div>
    )
}