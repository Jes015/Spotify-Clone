import { VolumeMaxIcon } from '@/assets/Icons'
import { Slider } from '@/components'
import styles from './sideRightControls.module.css'

export const SideRightControls = () => {
  return (
        <div>
            <div className={styles['sideRightControls__volume-container']}>
                <VolumeMaxIcon className="icon--md" />
                <div className={styles['sideRightControls__volume-slider-container']}>
                    <Slider />
                </div>
            </div>
        </div>
  )
}