import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { useThemeMode } from '@/hooks/useThemeMode'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons'
import Logo from './Logo'
import SocialLinks from './SocialLinks'
import ModalBackDrop from './ModalBackDrop'
import { useRouter } from 'next/router'

const burgerVariants = {
  open: {
    rotate: 720,
    transition: {
      duration: 0.5,
    },
  },
  close: {
    rotate: 0,
    transition: {
      duration: 0.5,
    },
  },
}

const Navbar = () => {
  const [isClient, setIsClient] = useState(false)
  const [themeColor, setThemeColor] = useThemeMode()
  const [mobileMenuIsOpen, setMobileMenuIsOpen] = useState(false)

  const router = useRouter()

  useEffect(() => {
    setIsClient(true)
  }, [])

  const toggleThemeColor = () => {
    setThemeColor(themeColor === 'light' ? 'dark' : 'light')
  }

  return (
    <>
      <div
        className='sticky top-0 z-50 h-32 w-full
          font-medium opacity-100
        dark:bg-slate-950 dark:text-white'
      >
        <div
          className='flex h-full w-full 
            bg-gradient-to-r 
          from-pink-500   
          via-red-500 to-yellow-500
            pb-[0.05rem] dark:pb-[0.025rem]'
        >
          <div
            className='flex 
              h-full w-full items-center justify-center
            bg-white 
              px-8 py-8
            dark:bg-slate-950 
              sm:px-12 md:px-24 lg:px-12 xl:px-32'
          >
            <nav className='flex h-full w-full items-center justify-between'>
              <Link href='/' className='hidden sm:flex'>
                <span
                  className='bg-gradient-to-r
                  from-pink-500 via-red-500 to-yellow-500
                    bg-clip-text 
                    text-base font-bold
                    text-transparent
                    sm:text-2xl md:text-3xl'
                >
                  WebWizzards
                </span>
              </Link>

              {/* mobile: burger */}
              <motion.button
                onClick={() => setMobileMenuIsOpen((prev) => !prev)}
                variants={burgerVariants}
                animate={mobileMenuIsOpen ? 'open' : 'close'}
                className='z-50 flex flex-col justify-center gap-2 lg:hidden'
              >
                <span
                  className={`${
                    mobileMenuIsOpen
                      ? 'translate-y-[0.7rem] rotate-45'
                      : 'rotate-0'
                  } block h-0.5 w-8 rounded-sm bg-pink-500 dark:bg-yellow-500`}
                ></span>
                <span
                  className={`${
                    mobileMenuIsOpen ? 'opacity-0' : 'animate-pulse opacity-100'
                  } block h-1 w-4 self-center rounded-sm bg-yellow-500 dark:bg-pink-500`}
                ></span>
                <span
                  className={`${
                    mobileMenuIsOpen
                      ? '-translate-y-[0.7rem] -rotate-45'
                      : 'rotate-0'
                  } block h-0.5 w-8 rounded-sm bg-pink-500 dark:bg-yellow-500`}
                ></span>
              </motion.button>

              <div className='flex items-center gap-2 md:gap-4 lg:gap-8'>
                {/* Toggle Theme Button */}
                <button onClick={toggleThemeColor}>
                  {isClient ? (
                    themeColor === 'light' ? (
                      <FontAwesomeIcon
                        icon={faMoon}
                        className='h-5 animate-pulse
                            font-extrabold text-pink-500 lg:h-7'
                      />
                    ) : (
                      <FontAwesomeIcon
                        icon={faSun}
                        className='h-5 animate-spin-slow
                      font-extrabold text-yellow-500 lg:h-7'
                      />
                    )
                  ) : (
                    ''
                  )}
                </button>

                {/* Desktop Menu */}
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
                  <Link
                    className='bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500
                    bg-clip-text font-bold
                    text-transparent transition-["scale"] duration-300 hover:scale-110 lg:text-lg'
                    href='/about'
                  >
                    About
                  </Link>
                </div>
              </div>

              {/* Logo */}
              <div className='absolute left-1/2 -translate-x-1/2'>
                <Logo />
              </div>
            </nav>
          </div>
        </div>
      </div>

      {/* mobile: backdrop & menu */}
      <ModalBackDrop
        mobileMenuIsOpen={mobileMenuIsOpen}
        setMobileMenuIsOpen={setMobileMenuIsOpen}
        className='z-50'
      >
        <div className='w-full py-1'>
          <nav
            className='flex flex-col 
              items-center justify-center gap-1'
          >
            <CustomLink
              As={'button'}
              handleClick={() => {
                router.push('/')
                setMobileMenuIsOpen(false)
              }}
              href='/'
              title='Home'
            />
            <CustomLink
              As={'button'}
              handleClick={() => {
                router.push('/courses')
                setMobileMenuIsOpen(false)
              }}
              href='/courses'
              title='Courses'
            />
            <CustomLink
              As={'button'}
              handleClick={() => {
                router.push('/authors')
                setMobileMenuIsOpen(false)
              }}
              href='/authors'
              title='Authors'
            />
            <CustomLink
              As={'button'}
              handleClick={() => {
                router.push('/about')
                setMobileMenuIsOpen(false)
              }}
              href='/about'
              title='About'
            />
          </nav>
          <div className='mt-5 flex w-full items-center justify-center gap-8'>
            <SocialLinks />
          </div>
        </div>
      </ModalBackDrop>
    </>
  )
}

export default Navbar

const CustomLink = ({ As, title, ...rest }) => {
  const router = useRouter()
  const isActive = router.asPath === rest.href

  const attribute = rest?.handleClick
    ? { onClick: rest.handleClick }
    : { href: rest.href }

  return (
    <As
      {...attribute}
      className={`relative my-2 
        bg-clip-text text-center text-3xl
        text-stone-100 dark:text-slate-950 
        lg:my-0 lg:text-lg ${isActive ? 'font-extrabold' : ''}`}
    >
      {title}
    </As>
  )
}
