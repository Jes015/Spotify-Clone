import styles from './linearLoading.module.css'
interface Props {
  classNameRoot: string
}

export const LinearLoading: React.FC<Props> = ({ classNameRoot }) => {
  return (
    <div className={[styles.linearLoading, classNameRoot].join(' ')}>
      <div className={styles.linearLoading__container}>
        <div className={styles.linearLoading__line} />
      </div>
    </div>
  )
}

export default LinearLoading