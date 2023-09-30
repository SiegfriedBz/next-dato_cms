import { motion } from 'framer-motion'

const modalVariants = {
  hidden: {
    opacity: 0,
    y: '-100vh',
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1,
      type: 'spring',
      stiffness: 200,
      damping: 10,
    },
  },
  exit: {
    y: '100vh',
  },
}

const ModalMenu = ({ mobileMenuIsOpen, children }) => {
  return (
    <motion.div
      variants={modalVariants}
      initial='hidden'
      animate={mobileMenuIsOpen ? 'visible' : ''}
      exit='exit'
      className='mx-8 flex w-full flex-col
        items-center justify-center
        rounded-lg 
        border border-stone-100
        bg-slate-900/50
        px-12 py-8 opacity-50
        shadow-2xl
        dark:border-slate-900 dark:bg-stone-100/50
        sm:mx-12 md:mx-24 lg:hidden'
      onClick={(e) => e.stopPropagation()}
    >
      {children}
    </motion.div>
  )
}

export default ModalMenu
