import SocialLinks from './SocialLinks'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeartPulse } from '@fortawesome/free-solid-svg-icons'

const Footer = () => {
  return (
    <footer
      className='flex w-full bg-gradient-to-r 
        from-pink-500 
        via-red-500 
        to-yellow-500 pt-[0.05rem] dark:pt-[0.025rem]'
    >
      <div
        className='flex h-full w-full flex-col items-center
          justify-between bg-white
          px-8 py-8 dark:bg-slate-950 sm:flex-row 
          sm:px-12 md:px-24 lg:px-12 xl:px-32'
      >
        <div
          className='bg-gradient-to-r
                 from-pink-500 via-red-500 to-yellow-500 
                 bg-clip-text
                 text-transparent'
        >
          <span>&copy;{new Date().getFullYear()} All Rights Reserved.</span>
        </div>
        <div
          className='flex items-center justify-center
                 bg-gradient-to-r from-pink-500 via-red-500 
                 to-yellow-500
                 bg-clip-text text-transparent'
        >
          Build with
          <span className='px-2 '>
            <FontAwesomeIcon
              icon={faHeartPulse}
              className='w-4
              text-red-500'
            />
          </span>
          by
          <a
            href='mailto:siegfried.bozza@yahoo.com'
            target='_blank'
            className='bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 
            bg-clip-text
            ps-2 text-transparent
             transition-["scale"] duration-300 hover:scale-105'
          >
            SiegfriedB
          </a>
        </div>
        <div className='hidden items-center gap-4 md:flex'>
          <SocialLinks />
        </div>
      </div>
    </footer>
  )
}

export default Footer
