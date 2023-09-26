import Link from 'next/link'
import Image from 'next/image'
import { gql } from 'graphql-request'
import { performRequest } from '@/lib/dato'
import Circle from '@/components/Circle'
import { AnimatedText } from '@/components/AnimatedText'

export default function Home({ courses }) {
  return (
    <>
      <section
        id='hero'
        className='grid w-full grid-cols-4 flex-col items-center justify-center md:my-24 md:flex-row md:gap-x-16'
      >
        <div className='col-span-4 md:col-span-2'>
          <Circle courses={courses} />
        </div>
        <div className='col-span-4 flex flex-col md:col-span-2'>
          <AnimatedText
            text='Get instant access to your free courses. Upgrade your dev skills.'
            className='mb-5 text-center text-3xl md:text-left md:text-7xl'
          />
          <div className='my-1 ms-auto flex w-full items-center justify-center gap-2 md:my-5 md:justify-start  md:gap-8'>
            <Link
              className='dark:text-dark rounded-xl 
              border border-slate-950
           bg-slate-950 px-4 py-2 text-sm font-bold 
            text-white transition-all duration-300
             hover:bg-white hover:text-slate-950
              dark:border-white
              dark:bg-white dark:text-slate-950 dark:hover:bg-slate-950
               dark:hover:text-white md:px-8 
               md:py-4 md:text-base'
              href='/courses'
            >
              Check your free courses!
            </Link>
            <a
              className='text-sm font-bold underline underline-offset-2 hover:text-slate-950/75 dark:hover:text-white/75 md:text-base'
              href='mailto:yoda@yoda.com'
            >
              Contact
            </a>
          </div>
        </div>
      </section>
    </>
  )
}

const coursesShortQuery = gql`
  {
    allCourses(first: 6) {
      id
      name
      image {
        id
        url
      }
      slug
    }
  }
`

export async function getStaticProps() {
  const { data } = await performRequest({
    query: coursesShortQuery,
  })

  return {
    props: {
      courses: data.allCourses || [],
    },
  }
}
