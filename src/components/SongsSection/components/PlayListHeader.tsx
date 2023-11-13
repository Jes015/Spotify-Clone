import Image from 'next/image'
import styles from '../songsSection.module.css'

interface Props {
  title: string
  description: string
  imageUrl: string
}

export const PlayListHeader: React.FC<Props> = ({ title, description, imageUrl }) => {
  return (
    <header className={styles['songSection__header--playlist']}>
      <div>
        <Image
          src={imageUrl}
          alt='playlist image'
          width={150}
          height={150}
        />
      </div>
      <div>
        <h3 className={
          [
            styles.songSection__title,
            styles['songSection__title--playlist']
          ].join(' ')
        }
        >{title}</h3>
        <p>{description}</p>
      </div>
    </header>
  )
}