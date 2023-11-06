import styles from './button.module.css'

interface ButtonProps extends React.HTMLProps<HTMLButtonElement> {
    rounded?: boolean
}

export const Button: React.FC<ButtonProps> = ({ children, className, rounded = false, ...props }) => {
    return (
        <button
            className={
                [
                    styles.button,
                    className,
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