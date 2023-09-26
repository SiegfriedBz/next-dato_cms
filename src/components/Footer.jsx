import { useEffect, useState } from 'react'
import SocialLinks from './SocialLinks'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeartPulse } from '@fortawesome/free-solid-svg-icons'

const Footer = () => {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  return (
    <footer className='dark:border-light flex w-full items-center justify-center border-t-[1px] border-solid border-black px-8 py-8 font-medium dark:border-white sm:px-12 md:px-24 lg:px-12 xl:px-32'>
      <div className='flex w-full flex-col items-center justify-between py-3 sm:flex-row sm:py-0'>
        <div>
          <span>&copy;{new Date().getFullYear()} All Rights Reserved.</span>
        </div>
        <div className='flex items-center justify-center'>
          Build with
          <span className='px-2 '>
            <FontAwesomeIcon
              icon={faHeartPulse}
              className='text-primary dark:text-primaryDark w-4'
            />
          </span>
          by
          <a
            href='mailto:siegfried.bozza@yahoo.com'
            target='_blank'
            className='ps-2 underline underline-offset-2 hover:text-gray-700 dark:hover:text-gray-300'
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
