import { useDebounce, useRouting } from '@/hooks'
import { useEffect, useRef, useState } from 'react'

export const useTextFieldSearch = () => {
  const [inputValue, setInputValue] = useState<string>('')
  const inputRef = useRef<HTMLInputElement>()
  const { goTo } = useRouting()
  const { debouncedValue } = useDebounce<string>(inputValue)

  useEffect(() => {
    if (inputRef?.current != null) {
      const searchParamTitle = new URL(location.toString()).searchParams.get('title') ?? ''
      setInputValue(searchParamTitle)
      inputRef.current.value = searchParamTitle
    }
  }, [])

  useEffect(() => {
    const newUrl = new URL(location.toString())

    newUrl.searchParams.delete('title')
    if (debouncedValue !== '') {
      newUrl.searchParams.append('title', debouncedValue)
    }

    goTo(newUrl.toString())
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedValue])

  const changeInputValue = (newValue: string) => {
    setInputValue(newValue)
  }

  return { inputRef, changeInputValue }
}