import { Suspense, lazy } from 'react'
import styles from './globalLoader.module.css'
import { useGlobalLoader } from './hooks'

const LinearLoading = lazy(async () => await import('@/components/ui/LinearLoading/LinearLoading'))

export const GlobalLoader = () => {
  const { isLoaderVisible } = useGlobalLoader()
  return (
    <Suspense>
        {isLoaderVisible && <LinearLoading classNameRoot={styles.globalLoader} />}
    </Suspense>
  )
}