import { NextIcon, PauseIcon, PreviousIcon } from '@/assets/Icons'
import { Button, Slider } from '@/components'
import styles from './mainControls.module.css'

export const MainControls = () => {
    return (
        <div className={styles.mainControls}>
            <div className={styles.mainControls__controls}>
                <Button rounded='100'>
                    <PreviousIcon className='icon--md' />
                </Button>
                <Button variant='solid' rounded='100'>
                    <PauseIcon className='icon--md' />
                </Button>
                <Button rounded='100'>
                    <NextIcon className='icon--md' />
                </Button>
            </div>
            <div className={styles.mainControls__sliderTime}>
                <span>
                    0:13
                </span>
                <Slider />
                <span>
                    0:13
                </span>
            </div>
        </div>
    )
}