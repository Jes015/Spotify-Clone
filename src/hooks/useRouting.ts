import { usePathname, useRouter } from 'next/navigation'

export const useRouting = () => {
  const pathname = usePathname()
  const navigation = useRouter()

  const goTo = (url: string) => {
    navigation.push(url)
  }

  const refresh = () => {
    navigation.refresh()
  }

  const goBack = () => {
    navigation.back()
  }

  const goForward = () => {
    navigation.forward()
  }

  return { goBack, goTo, refresh, goForward, pathname }
}