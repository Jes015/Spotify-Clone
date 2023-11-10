'use client'
import { forwardRef } from 'react'
import styles from './input.module.css'

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {

}

export const Input = forwardRef<HTMLInputElement, Props>(
  ({ className, id, name, onBlur, onChange, type, accept, placeholder, required, ...props }, ref) => {
    return (
            <input
                name={name}
                type={type}
                onBlur={onBlur}
                onChange={onChange}
                id={id}
                ref={ref}
                accept={accept}
                placeholder={placeholder}
                className={[styles.input, className].join(' ')}
                required={required}
                {...{ props }}
            />
    )
  }
)

Input.displayName = 'Input'
