'use client'
import { CloseIcon } from '@/assets/Icons'
import { Button } from '@/components/ui'
import { Close, Content, Description, Overlay, Portal, Root, Title } from '@radix-ui/react-dialog'
import styles from './modal.module.css'

interface Props {
  children: React.ReactNode
  isOpen: boolean
  title: string
  description: string
  onChange: () => void
}

export const Modal: React.FC<Props> = ({ title, description, children, isOpen, onChange }) => {
  const handleOnChange = () => {
    onChange()
  }

  return (
        <Root
            open={isOpen}
            defaultOpen={isOpen}
            onOpenChange={handleOnChange}
        >
            <Portal>
                <Overlay className={styles.modal__overlay} />
                <div className={styles['modal__content-wrapper']}>
                    <Content className={styles.modal__content}>
                        <header className={styles.modal__header}>
                            <div className={styles['modal__title-container']}>
                                <Title className={styles.modal__title}>{title}</Title>
                                <Description className={styles.modal__description}>{description}</Description>
                            </div>
                            <Close asChild>
                                <Button rounded='100'>
                                    <CloseIcon className='icon--md' />
                                </Button>
                            </Close>
                        </header>
                        <div className={styles['model__main-container']}>
                            {children}
                        </div>
                    </Content>
                </div>
            </Portal>
        </Root>
  )
}

export default Modal
