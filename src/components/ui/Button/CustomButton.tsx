"use client"
import styles from './button.module.css'

interface ButtonProps extends React.HTMLProps<HTMLButtonElement> {
    rounded?: '100' | 'medium'
    variant?: 'default' | 'solid'
}

export const Button: React.FC<ButtonProps> = ({ children, variant = 'default', className, rounded = false, onClick, ...props }) => {

    return (
        <button
            onClick={onClick}
            className={
                [
                    styles.button,
                    className,
                    variant === 'default' ? styles['button--default'] : '',
                    variant === 'solid' ? styles['button--solid'] : '',
                    rounded === '100' ? styles['button--rounded-100'] : '',
                    rounded === 'medium' ? styles['button--rounded-medium'] : ''
                ].join(' ')
            }
            {...{ props }}
        >
            {children}
        </button>
    )
}

export default Button