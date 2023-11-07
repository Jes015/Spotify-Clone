import { HeartOutlinedIcon } from "@/assets/Icons"
import Image from "next/image"
import styles from './currentSong.module.css'

export const CurrentSong = () => {
    return (
        <div className={styles.currentSong}>
            <Image
                src='https://i.scdn.co/image/ab67616d000048517b1fc51ff3257b5286a1ecec'
                alt="bad bunny image"
                className={styles.currentSong__image}
                width={56}
                height={56}
            />
            <div className={styles['currentSong__data-container']}>
                <h5 className={styles.currentSong__title}>LOS PITS</h5>
                <span className={styles.currentSong__artist}>Bad Bunny</span>
            </div>
            <HeartOutlinedIcon className="icon--md" />
        </div>
    )
}