'use client'
import { forwardRef } from 'react'
import styles from './button.module.css'

interface ButtonProps extends React.HTMLProps<HTMLButtonElement> {
  rounded?: '100' | 'medium'
  variant?: 'default' | 'solid'
  color?: 'dark'
  size2?: 'md' | 'xl'
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, variant = 'default', color, size2 = 'xl', className, rounded = false, onClick, ...props }, ref) => {
    return (
      <button
        onClick={onClick}
        ref={ref}
        className={
          [
            styles.button,
            className,
            variant === 'default' ? styles['button--default'] : '',
            variant === 'solid' ? styles['button--solid'] : '',
            rounded === '100' ? styles['button--rounded-100'] : '',
            rounded === 'medium' ? styles['button--rounded-medium'] : '',
            color === 'dark' ? styles['button--dark'] : '',
            props.disabled === true ? styles['button--disabled'] : '',
            size2 === 'md' ? styles['button--md'] : ''
          ].join(' ')
        }
        {...{ props }}
      >
        {children}
      </button>
    )
  }
)

Button.displayName = 'Button'

export default Button