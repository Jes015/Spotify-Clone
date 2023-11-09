import { NextLineIcon, PreviousLineIcon } from '@/assets/Icons'
import { Button } from '@/components'
import { useRouting } from '@/hooks'
import styles from './goBackForwardNavigation.module.css'

export const GoBackForwardNavigation = () => {
  const { goBack, goForward } = useRouting()

  const handleOnClickGoBack = () => {
    goBack()
  }

  const handleOnClickGoForward = () => {
    goForward()
  }

  return (
    <nav className={styles.goBackForwardNavigation}>
      <Button
        variant='solid'
        rounded='100'
        color='dark'
        onClick={handleOnClickGoBack}
      >
        <PreviousLineIcon className='icon--md' />
      </Button>
      <Button
        variant='solid'
        rounded='100'
        color='dark'
        onClick={handleOnClickGoForward}
      >
        <NextLineIcon className='icon--md' />
      </Button>
    </nav>
  )
}
