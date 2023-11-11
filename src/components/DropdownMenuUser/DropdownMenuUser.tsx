'use client'
import { LinkIcon, UserIcon } from '@/assets/Icons'
import { DropdownMenu } from '@/components'
import { useGlobalUser, useRouting } from '@/hooks'
import { frontRoutes } from '@/models'

export const DropdownMenuUser = () => {
  const { user, isLoading, signOut } = useGlobalUser()
  const { goTo } = useRouting()

  const handleOnClickForGoToProfile = () => {
    goTo(frontRoutes.staticRoutes.profile)
  }

  const handleOnClickForSignOut = () => {
    if (user != null && !isLoading) {
      signOut()
    }
  }

  return (
    <DropdownMenu
      triggerIcon={
        <UserIcon className="icon--md" />
      }
    >
      <DropdownMenu.Item onClick={handleOnClickForGoToProfile}>
        <span>Profile</span> <LinkIcon className='icon--base' />
      </DropdownMenu.Item>
      <DropdownMenu.Item onClick={handleOnClickForSignOut}>
        Sign out
      </DropdownMenu.Item>
    </DropdownMenu>
  )
}
