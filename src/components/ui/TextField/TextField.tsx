'use client'
import { Input } from '@/components'
import { forwardRef, useId, type HTMLInputTypeAttribute } from 'react'
import { type FieldError, type UseFormRegisterReturn } from 'react-hook-form'
import styles from './textField.module.css'

interface Props {
  label?: string
  placeHolder?: string
  registerData?: UseFormRegisterReturn<string>
  type?: HTMLInputTypeAttribute
  accept?: 'audio/mp3' | 'image/*'
  error: FieldError | undefined | string
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
  ref?: React.Ref<HTMLInputElement>
}

export const TextField: React.FC<Props> = forwardRef(
  ({ label, placeHolder, registerData, type = 'text', accept, error, onChange }, ref) => {
    const id = useId()

    return (
      <div className={styles.textField}>
        {
          label != null &&
          <label
            htmlFor={id}
            className={styles.textField__label}
          >
            {label}
          </label>
        }
        <Input
          id={id}
          type={type}
          placeholder={placeHolder}
          accept={accept}
          name={registerData?.name}
          onChange={onChange ?? registerData?.onChange}
          onBlur={registerData?.onBlur}
          ref={ref ?? registerData?.ref}
          required={registerData?.required}
        />
        <span className={styles.textField__error}>
          {
            typeof error === 'string' ? error : error?.message
          }
        </span>
      </div>
    )
  }
)

TextField.displayName = 'TextField'