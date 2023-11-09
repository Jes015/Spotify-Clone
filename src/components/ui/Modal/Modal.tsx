"use client"
import { CloseIcon } from '@/assets/Icons'
import { Button } from '@/components/ui'
import * as Dialog from '@radix-ui/react-dialog'
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
        <Dialog.Root
            open={isOpen}
            defaultOpen={isOpen}
            onOpenChange={handleOnChange}
        >
            <Dialog.Portal>
                <Dialog.Overlay className={styles.modal__overlay} />
                <div className={styles['modal__content-wrapper']}>
                    <Dialog.Content className={styles.modal__content}>
                        <header className={styles.modal__header}>
                            <div className={styles['modal__title-container']}>
                                <Dialog.Title className={styles.modal__title}>{title}</Dialog.Title>
                                <Dialog.Description className={styles.modal__description}>{description}</Dialog.Description>
                            </div>
                            <Dialog.Close asChild>
                                <Button rounded='100'>
                                    <CloseIcon className='icon--md' />
                                </Button>
                            </Dialog.Close>
                        </header>
                        <div className={styles['model__main-container']}>
                            {children}
                        </div>
                    </Dialog.Content>
                </div>
            </Dialog.Portal>
        </Dialog.Root>
    )
}

export default Modal
