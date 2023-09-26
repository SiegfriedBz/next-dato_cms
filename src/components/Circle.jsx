import { useState, useRef, useLayoutEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'

const circleVariants = {
  animate: {
    rotate: 360,
    transition: {
      duration: 12,
      repeat: Infinity,
    },
  },
}

const Circle = ({ courses }) => {
  const [circleCenter, setCircleCenter] = useState({ x: 0, y: 0 })
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
        {courses?.map((course, index) => {
          const angle = 60 * index
          const x =
            circleCenter.x + circleRadius * Math.cos((angle * Math.PI) / 180)
          const y =
            circleCenter.y + circleRadius * Math.sin((angle * Math.PI) / 180)

          return (
            <Link key={course.id} href={`/courses/${course.slug}`}>
              <Image
                priority
                src={course.image.url}
                width={150}
                height={150}
                alt={course.name}
                style={{
                  top: `${y}px`,
                  left: `${x}px`,
                  transform: `translate(-50%, -50%) rotate(${angle}deg)`,
                }}
                className={`shadow-3xl absolute left-1/2 top-1/2
                 flex 
                 h-[4.25rem] w-[4.25rem] -translate-x-1/2 
                 -translate-y-1/2 items-center
                  justify-center overflow-hidden 
                   rounded-full 
                   object-contain p-1 
                   shadow-xl hover:shadow-2xl dark:shadow-md
                   dark:shadow-slate-100 
                   dark:hover:shadow-md dark:hover:shadow-white md:h-24 md:w-24 ${
                     course.name.includes('Next.JS') ? 'dark:bg-white' : ''
                   }`}
              />
            </Link>
          )
        })}
      </motion.div>
    </div>
  )
}

export default Circle
