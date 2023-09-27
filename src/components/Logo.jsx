import { motion } from 'framer-motion'
import { useRouter } from 'next/router'

const logoVariants = {
  hover: {
    scale: 1.15,
    transition: {
      duration: 0.5,
      type: 'spring',
      stiffness: 500,
    },
  },
}

const Logo = ({ setMobileMenuIsOpen }) => {
  const router = useRouter()

  return (
    <div className='flex items-center justify-center'>
      <motion.button
        variants={logoVariants}
        whileHover='hover'
        className='flex h-[4rem] w-[4rem]
          items-center justify-center rounded-full 
          bg-gradient-to-r
          from-pink-500 
          via-red-500 
          to-yellow-500 p-[0.15rem]
          '
        onClick={() => {
          router.push('/')
          // setMobileMenuIsOpen(false)
        }}
      >
        <span
          className='bg:transparent darx:p-1
            inline-flex
            h-full w-full 
            items-center justify-center
            rounded-full
            dark:bg-slate-950'
        >
          <span
            className='inline-flex 
            h-full w-full 
            items-center justify-center
            text-2xl font-extrabold 
            text-white
              dark:bg-gradient-to-r
            dark:from-pink-500 dark:via-red-500 dark:to-yellow-500
              dark:bg-clip-text dark:text-transparent'
          >
            WZ
          </span>
        </span>
      </motion.button>
    </div>
  )
}

export default Logo
