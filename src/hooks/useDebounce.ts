'use client'
import { useEffect, useState } from 'react'

export const useDebounce = <T> (value: T) => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedValue(value)
    }, 200)

    return () => {
      clearTimeout(timeout)
    }
  }, [value])

  return { debouncedValue }
}