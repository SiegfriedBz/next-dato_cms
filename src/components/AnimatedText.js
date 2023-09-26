import { motion } from 'framer-motion'

const textVariants = {
  hidden: {
    opacity: 0,
    y: '24px',
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1.75,
      staggerChildren: 0.15,
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
      duration: 0.35,
    },
  },
}

export const AnimatedText = ({ text, className = '' }) => {
  return (
    <motion.h1
      variants={textVariants}
      initial='hidden'
      animate='visible'
      className={`overflow-hidden py-0 text-center sm:py-2 ${className} bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 bg-clip-text text-3xl font-bold text-transparent lg:text-7xl`}
    >
      {text.split(' ').map((word, idx) => {
        return (
          <motion.span
            key={idx}
            variants={wordVariants}
            className='inline-block pt-3'
          >
            {word}&nbsp;
          </motion.span>
        )
      })}
    </motion.h1>
  )
}
