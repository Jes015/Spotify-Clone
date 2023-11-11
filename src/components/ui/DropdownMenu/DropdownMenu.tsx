'use client'
import { Button } from '@/components'
import { Content, Portal, Root, Trigger } from '@radix-ui/react-dropdown-menu'
import { useState } from 'react'
import { DropdownMenuItem } from './components'
import styles from './dropdownMenu.module.css'

interface Props {
  triggerIcon: React.ReactNode
  children: React.ReactNode
  alignContent?: 'start' | 'center' | 'end'
}

export const DropdownMenu = ({ children, triggerIcon, alignContent = 'end' }: Props) => {
  const [isOpen, setIsOpen] = useState(false)

  const handleOnClick = () => {
    setIsOpen(prev => !prev)
  }

  return (
    <Root open={isOpen} defaultOpen={isOpen} onOpenChange={handleOnClick}>
      <Trigger asChild>
        <Button
          color='dark'
          onClick={handleOnClick}
          rounded='100'
        >
          {triggerIcon}
        </Button>
      </Trigger>

      <Portal>
        <Content align={alignContent} className={styles.DropdownMenuContent} sideOffset={5}>
          {children}
        </Content>
      </Portal>
    </Root>
  )
}

DropdownMenu.Item = DropdownMenuItem