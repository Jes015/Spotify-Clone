"use client"
import * as Dialog from '@radix-ui/react-dialog'
import styles from './modal.module.css'

interface Props {
    children: React.ReactNode
    isOpen: boolean
    title: string
    description: string
    onChange: () => void
}

export const Modal: React.FC<Props> = ({ children, isOpen, onChange }) => {
    return (
        <Dialog.Root
            open={isOpen}
            defaultOpen={isOpen}
            onOpenChange={onChange}
        >
            <Dialog.Portal>
                <Dialog.Overlay className={styles.modal__overlay} />
                <Dialog.Content className={styles.modal__content}>
                    hola
                </Dialog.Content>
            </Dialog.Portal>
            <div>
                {children}
            </div>

        </Dialog.Root>
    )
}

export default Modal
