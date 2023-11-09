import { type Icon } from '@/models'
import Link from 'next/link'
import styles from './navigationItem.module.css'

interface Props {
  title: string
  href: string
  Icon: Icon
  isSelected?: boolean
}

export const NavigationItem: React.FC<Props> = ({ title, href, Icon, isSelected = false }) => {
  return (
        <Link className={[styles.navigationItem, isSelected ? styles['navigationItem--selected'] : ' '].join(' ')} {...{ href }}>
            <Icon className='icon' />
            <span>{title}</span>
        </Link>
  )
}