"use client"
import styles from './button.module.css'

interface ButtonProps extends React.HTMLProps<HTMLButtonElement> {
    rounded?: '100' | 'medium'
    variant?: 'default' | 'solid'
    color?: 'dark'
    size2?: 'md' | 'xl'
}

export const Button: React.FC<ButtonProps> = ({ children, variant = 'default', color, size2 = 'xl', className, rounded = false, onClick, ...props }) => {

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
                    rounded === 'medium' ? styles['button--rounded-medium'] : '',
                    color === 'dark' ? styles['button--dark']: '',
                    props.disabled === true ? styles['button--disabled'] : '',
                    size2 == 'md' ? styles['button--md'] : ''
                ].join(' ')
            }
            {...{ props }}
        >
            {children}
        </button>
    )
}

export default Button