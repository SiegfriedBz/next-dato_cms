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
        className='flex flex-col items-center justify-center gap-y-16 md:flex-row md:gap-x-16'
      >
        <Circle courses={courses} />
        <AnimatedText
          text='Explore our courses'
          className='text-center text-4xl md:text-left md:text-7xl'
        />
      </section>
      {/* <div className='flex w-full items-center justify-center gap-8'>
        <Link
          className='rounded-xl border border-slate-950 bg-slate-950 px-8 py-4 font-bold text-white transition-all duration-300 hover:bg-white hover:text-slate-950 dark:border-white dark:bg-white dark:text-slate-950 dark:hover:bg-slate-950 dark:hover:text-white'
          href='/courses'
        >
          Check our free courses!
        </Link>
        <a
          className='font-bold underline underline-offset-2 hover:text-slate-950/75 dark:hover:text-white/75'
          href='mailto:yoda@yoda.com'
        >
          Contact
        </a>
      </div> */}
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
