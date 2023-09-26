import { useEffect } from 'react'
import { useLocalStorage } from './useLocalStorage'

export const useThemeMode = () => {
  const [themeColor, setThemeColor] = useLocalStorage(
    'dato-next-courses-theme',
    'light'
  )

  useEffect(() => {
    setThemeColor(() => {
      return window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light'
    })
  }, [setThemeColor])

  useEffect(() => {
    const documentElementClasses = window.document.documentElement.classList
    documentElementClasses.toggle('dark', themeColor === 'dark')
  }, [themeColor])

  return [themeColor, setThemeColor]
}
