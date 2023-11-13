import styles from '../songsSection.module.css'

interface Props {
  title: string
}

export const SectionHeader: React.FC<Props> = ({ title }) => {
  return (
        <header>
            <h3 className={styles.songSection__title}>{title}</h3>
        </header>
  )
}
