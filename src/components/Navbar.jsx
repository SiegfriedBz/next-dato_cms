import { useState, useLayoutEffect } from 'react'
import Link from 'next/link'
import { useThemeMode } from '@/hooks/useThemeMode'
import { MoonIcon, SunIcon } from './Icons'

const Navbar = () => {
  const [isClient, setIsClient] = useState(false)
  const [themeColor, setThemeColor] = useThemeMode()

  useLayoutEffect(() => {
    setIsClient(true)
  }, [])

  const toggleThemeColor = () => {
    setThemeColor(themeColor === 'light' ? 'dark' : 'light')
  }

  return (
    <div className='sticky top-0 border-b border-slate-950 bg-white px-16 py-8 opacity-100 dark:border-white dark:bg-slate-950 dark:text-white'>
      <nav className='flex items-center justify-between'>
        <Link href='/'>LOGO</Link>
        <div className='flex gap-8'>
          <button onClick={toggleThemeColor}>
            {isClient ? (
              themeColor === 'light' ? (
                <MoonIcon className='fill-white' />
              ) : (
                <SunIcon className='fill-white' />
              )
            ) : (
              ''
            )}
          </button>
          <div className='hidden md:flex'>
            <Link className='hover:text-slate-600' href='/'>
              Home
            </Link>
            <Link className='hover:text-slate-600' href='/courses'>
              Courses
            </Link>
            <Link className='hover:text-slate-600' href='/authors'>
              Authors
            </Link>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default Navbar
