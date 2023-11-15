import { VolumeMaxIcon, VolumeMediumIcon, VolumeMinimumIcon, VolumeMuteIcon } from '@/assets/Icons'
import { Slider } from '@/components'
import { useSongPlayerStore } from '@/utils/store'
import styles from './sideRightControls.module.css'

interface Props {
  changeVolume: (newVolumeValue: number) => void
}

export const SideRightControls: React.FC<Props> = ({ changeVolume }) => {
  const [volume] = useSongPlayerStore(state => [state.volume])
  const handleOnChangeVolume = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newVolumeValue = Number(event.currentTarget.value)

    if (isNaN(newVolumeValue)) return

    changeVolume(newVolumeValue)
  }
  return (
        <div>
            <div className={styles['sideRightControls__volume-container']}>
                {
                    volume >= 0.8 && <VolumeMaxIcon className="icon--md" />
                }
                {
                    (volume >= 0.5 && volume < 0.8) && <VolumeMediumIcon className="icon--md" />
                }
                {
                    (volume > 0 && volume < 0.5) && <VolumeMinimumIcon className="icon--md" />
                }
                {
                    volume === 0 && <VolumeMuteIcon className="icon--md" />
                }
                <div className={styles['sideRightControls__volume-slider-container']}>
                    <Slider min={0} step={0.005} max={1} onChange={handleOnChangeVolume} />
                </div>
            </div>
        </div>
  )
}