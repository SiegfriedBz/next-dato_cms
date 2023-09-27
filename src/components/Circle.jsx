import { useState, useRef, useLayoutEffect } from 'react'
import Link from 'next/link'
import { Image } from 'react-datocms'
import { motion } from 'framer-motion'

const circleVariants = {
  animate: {
    rotate: 3600,
    transition: {
      duration: 120,
      repeat: Infinity,
    },
  },
}

const Circle = ({ courses }) => {
  const [circleCenter, setCircleCenter] = useState({
    x: undefined,
    y: undefined,
  })
  const [circleRadius, setCircleRadius] = useState(95)

  const outerDivRef = useRef(null)

  useLayoutEffect(() => {
    const innerWidth = window.innerWidth
    if (innerWidth > 640) {
      setCircleRadius(155)
    }
    if (outerDivRef.current != null) {
      const { width, height } = outerDivRef.current.getBoundingClientRect()
      setCircleCenter({
        x: width / 2,
        y: height / 2,
      })
    }
  }, [])

  return (
    <div className='flex w-full items-center justify-center overflow-hidden py-24'>
      <motion.div
        ref={outerDivRef}
        className='relative my-5 h-20 w-20 rounded-full md:mt-0 md:h-64 md:w-64'
        variants={circleVariants}
        animate='animate'
      >
        {circleCenter.x != undefined &&
          circleCenter.y != undefined &&
          courses?.map((course, index) => {
            const angle = 60 * index
            const x =
              circleCenter.x + circleRadius * Math.cos((angle * Math.PI) / 180)
            const y =
              circleCenter.y + circleRadius * Math.sin((angle * Math.PI) / 180)

            return (
              <Link key={course.id} href={`/courses/${course.slug}`}>
                <motion.span
                  className='absolute left-1/2 top-1/2
                    h-[4.25rem] w-[4.25rem] 
                    -translate-x-1/2 
                    -translate-y-1/2 
                    overflow-hidden 
                    rounded-full 
                    bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 
                    p-[0.025rem] shadow-2xl 
                     dark:shadow-sm
                    dark:shadow-white md:h-24 md:w-24 lg:h-28
                    lg:w-28 xl:h-32
                    xl:w-32 
                  '
                  style={{
                    top: `${y}px`,
                    left: `${x}px`,
                    transform: `translate(-50%, -50%) rotate(${angle}deg)`,
                  }}
                >
                  <span
                    className={`
                      shadow-3xl 
                      flex h-full 
                      w-full items-center 
                      justify-center 
                      overflow-hidden 
                      rounded-full bg-white 
                      dark:bg-slate-950
                      ${
                        course.name.includes('Next.JS')
                          ? 'p-1 dark:bg-white dark:p-0'
                          : 'p-1'
                      }
                    `}
                  >
                    <Image
                      data={course.image.responsiveImage}
                      width={150}
                      height={150}
                      alt={course.name}
                      className='h-full w-full rounded-full object-contain'
                    />
                  </span>
                </motion.span>
              </Link>
            )
          })}
      </motion.div>
    </div>
  )
}

export default Circle
