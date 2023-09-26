import { useState, useRef, useEffect, useLayoutEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'

const Circle = ({ courses }) => {
  const [circleCenter, setCircleCenter] = useState({ x: 0, y: 0 })
  const [circleRadius, setCircleRadius] = useState(95)

  const outerDivRef = useRef(null)

  useLayoutEffect(() => {
    const width = window.innerWidth
    if (width > 640) {
      setCircleRadius(125)
    }
  }, [])

  useEffect(() => {
    if (outerDivRef.current !== null) {
      const { width, height } = outerDivRef.current.getBoundingClientRect()
      setCircleCenter({
        x: width / 2,
        y: height / 2,
      })
    }
  }, [])

  return (
    <div className='w-full'>
      <motion.div
        ref={outerDivRef}
        className='relative left-[20px] mt-5 h-72 w-72 rounded-full md:mt-0'
        animate={{ rotate: 360 }}
        transition={{ duration: 12, repeat: Infinity }}
      >
        {courses?.map((course, index) => {
          const angle = 60 * index
          const x =
            circleCenter.x + circleRadius * Math.cos((angle * Math.PI) / 180)
          const y =
            circleCenter.y + circleRadius * Math.sin((angle * Math.PI) / 180)

          return (
            <Link key={course.id} href={`/courses/${course.slug}`} className=''>
              <Image
                src={course.image.url}
                width={150}
                height={150}
                alt={course.name}
                style={{
                  top: `${y}px`,
                  left: `${x}px`,
                  transform: `translate(-50%, -50%) rotate(${angle}deg)`,
                }}
                className={`dark:hover:shadow-white' shadow-3xl
                 dark:shadow-smdark:shadow-slate-100 absolute left-1/2 top-1/2 flex h-[4.5rem]
                  w-[4.5rem] -translate-x-1/2 
                   -translate-y-1/2 items-center justify-center 
                   rounded-full object-contain p-1 shadow-xl 
                   hover:shadow-2xl dark:hover:shadow-md 
                   md:h-24 md:w-24 ${
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
