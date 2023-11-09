import { usePathname } from 'next/navigation'
export const useNavigation = () => {
  const currentPathName = usePathname()

  return { currentPathName }
}