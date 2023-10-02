import { motion } from 'framer-motion'
import { useRouter } from 'next/router'

const textVariants = {
  hidden: {
    opacity: 0,
    y: '20px',
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1.85,
      staggerChildren: 0.2,
    },
  },
}

const wordVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.25,
    },
  },
}

export const AnimatedText = ({ text, className = '' }) => {
  const router = useRouter()
  const isHomePage = router.pathname === '/'
  const gradientTextClass =
    'bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 bg-clip-text text-transparent'

  return (
    <motion.h1
      variants={textVariants}
      initial='hidden'
      animate='visible'
      className={`mb-5 overflow-hidden text-center sm:py-2 ${
        isHomePage ? gradientTextClass : ''
      }
        ${className}`}
    >
      {text.split(' ').map((word, idx) => {
        return (
          <motion.span
            key={idx}
            variants={wordVariants}
            className={`inline-block font-bold sm:pt-3 ${
              !isHomePage ? gradientTextClass : ''
            }`}
          >
            {word}&nbsp;
          </motion.span>
        )
      })}
    </motion.h1>
  )
}
