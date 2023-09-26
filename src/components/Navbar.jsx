import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useThemeMode } from '@/hooks/useThemeMode'
import { MoonIcon, SunIcon } from './Icons'
import Logo from './Logo'

const Navbar = () => {
  const [isClient, setIsClient] = useState(false)
  const [themeColor, setThemeColor] = useThemeMode()

  useEffect(() => {
    setIsClient(true)
  }, [])

  const toggleThemeColor = () => {
    setThemeColor(themeColor === 'light' ? 'dark' : 'light')
  }

  return (
    <div className='sticky top-0 z-10 border-b border-slate-950 bg-white px-8 py-8 font-medium opacity-100 dark:border-white dark:bg-slate-950 dark:text-white sm:px-12 md:px-24 lg:px-12 xl:px-32'>
      <nav className='flex items-center justify-between'>
        <Link href='/' className='hidden sm:flex'>
          <span className='bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 bg-clip-text text-base font-bold text-transparent sm:text-2xl md:text-3xl'>
            WebWizards
          </span>
        </Link>
        <div className='flex gap-8 self-end'>
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

          {/* <div className='hidden md:flex'>
            <Link className='hover:text-slate-600' href='/'>
              Home
            </Link>
            <Link className='hover:text-slate-600' href='/courses'>
              Courses
            </Link>
            <Link className='hover:text-slate-600' href='/authors'>
              Authors
            </Link>
          </div> */}
        </div>
        <div className='absolute left-1/2 -translate-x-1/2'>
          <Logo />
        </div>
      </nav>
    </div>
  )
}

export default Navbar
