'use client'
import { Input } from '@/components'
import { useId, type HTMLInputTypeAttribute } from 'react'
import { type FieldError, type UseFormRegisterReturn } from 'react-hook-form'
import styles from './textField.module.css'

interface Props {
  label: string
  placeHolder?: string
  registerData: UseFormRegisterReturn<string>
  type?: HTMLInputTypeAttribute
  accept?: 'audio/mp3' | 'image/*'
  error: FieldError | undefined
}

export const TextField: React.FC<Props> = ({ label, placeHolder, registerData, type = 'text', accept, error }) => {
  const id = useId()

  return (
    <div className={styles.textField}>
      <label
        htmlFor={id}
        className={styles.textField__label}
      >
        {label}
      </label>
      <Input
        id={id}
        type={type}
        placeholder={placeHolder}
        accept={accept}
        name={registerData.name}
        onChange={registerData.onChange}
        onBlur={registerData.onBlur}
        ref={registerData.ref}
        required={registerData.required}
      />
      <span className={styles.textField__error}>
        {
          error?.message
        }
      </span>
    </div>
  )
}
