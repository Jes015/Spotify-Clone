'use client'
import { TextField } from '@/components'
import { type MutableRefObject } from 'react'
import { useTextFieldSearch } from './hooks'

interface Props {
  error: string
}
export const TextFieldSearch: React.FC<Props> = ({ error }) => {
  const { changeInputValue, inputRef } = useTextFieldSearch()

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.currentTarget.value

    changeInputValue(inputValue)
  }

  return (
        <TextField
            label="Search a song, artist, playlist..."
            placeHolder="The weeknd"
            error={error}
            onChange={handleOnChange}
            ref={inputRef as MutableRefObject<HTMLInputElement>}

        />
  )
}