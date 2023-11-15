'use client'

import { HomeIcon, SearchIcon } from '@/assets/Icons'
import { frontRoutes } from '@/models'
import { NavigationItem } from './components/NavigationItem'
import { useNavigation } from './hooks'
import styles from './navigation.module.css'

const routesAdaptedData = [
  {
    title: 'Home',
    icon: HomeIcon,
    pathname: frontRoutes.staticRoutes.home
  },
  {
    title: 'Search',
    icon: SearchIcon,
    pathname: frontRoutes.staticRoutes.search
  }
]

export const Navigation = () => {
  const { currentPathName } = useNavigation()
  return (
        <nav className={styles.navigation}>
            {
                routesAdaptedData.map((routeData) => (
                    <NavigationItem
                        key={routeData?.title}
                        title={routeData?.title}
                        href={routeData.pathname}
                        Icon={routeData.icon}
                        isSelected={currentPathName === routeData.pathname}
                    />
                ))
            }
        </nav>
  )
}
