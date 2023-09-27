import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useThemeMode } from '@/hooks/useThemeMode'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons'
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

  console.log('isClient', isClient)
  console.log('themeColor', themeColor)

  return (
    <div
      className='sticky top-0 z-10
       font-medium opacity-100
        dark:bg-slate-950 dark:text-white 
        '
    >
      <div
        className='flex h-24 w-full 
        bg-gradient-to-r 
        from-pink-500 
        via-red-500 to-yellow-500 pb-[0.1rem]'
      >
        <div
          className='flex h-full w-full items-center justify-center
         bg-white px-8 py-8 dark:bg-slate-950 sm:px-12 md:px-24 lg:px-12 xl:px-32'
        >
          <nav className='flex h-full w-full items-center justify-between'>
            <Link href='/' className='hidden sm:flex'>
              <span
                className='bg-gradient-to-r
               from-pink-500 via-red-500 to-yellow-500 bg-clip-text 
               text-base font-bold text-transparent sm:text-2xl md:text-3xl'
              >
                WebWizzards
              </span>
            </Link>

            <div className='my-auto flex self-end md:gap-4 lg:gap-8'>
              <button onClick={toggleThemeColor}>
                {isClient ? (
                  themeColor === 'light' ? (
                    <FontAwesomeIcon
                      icon={faMoon}
                      className='h-4 animate-pulse
                      font-bold text-pink-500 lg:h-6'
                    />
                  ) : (
                    <FontAwesomeIcon
                      icon={faSun}
                      className='h-4 animate-spin-slow
                      font-bold text-yellow-500 lg:h-6'
                    />
                  )
                ) : (
                  ''
                )}
              </button>

              <div className='hidden md:flex md:gap-4 lg:gap-8'>
                <Link
                  className='bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500
                    bg-clip-text font-bold
                    text-transparent transition-["scale"] duration-300 hover:scale-110 lg:text-lg'
                  href='/courses'
                >
                  Courses
                </Link>
                <Link
                  className='bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500
                    bg-clip-text font-bold
                    text-transparent transition-["scale"] duration-300 hover:scale-110 lg:text-lg'
                  href='/authors'
                >
                  Authors
                </Link>
              </div>
            </div>
            <div className='absolute left-1/2 -translate-x-1/2'>
              <Logo />
            </div>
          </nav>
        </div>
      </div>
    </div>
  )
}

export default Navbar
