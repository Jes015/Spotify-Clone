import styles from './button.module.css'

interface ButtonProps extends React.HTMLProps<HTMLButtonElement> {
    rounded?: boolean
    variant?: 'default' | 'solid'
}

export const Button: React.FC<ButtonProps> = ({ children, variant = 'default', className, rounded = false, ...props }) => {
    return (
        <button
            className={
                [
                    styles.button,
                    className,
                    variant === 'default' ? styles['button--default'] : '',
                    variant === 'solid' ? styles['button--solid'] : '',
                    rounded ? styles['button--rounded'] : ''
                ].join(' ')
            }
            {...{ props }}
        >
            {children}
        </button>
    )
}

export default Button