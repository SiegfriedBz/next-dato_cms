import Link from 'next/link'
import { gql } from 'graphql-request'
import { performRequest } from '@/lib/dato'
import Circle from '@/components/Circle'
import { AnimatedText } from '@/components/AnimatedText'

export default function Home({ courses }) {
  return (
    <>
      <section
        id='hero'
        className='grid w-full grid-cols-4 flex-col items-center justify-center lg:my-24 lg:flex-row lg:gap-x-16'
      >
        <div className='col-span-4 lg:col-span-2'>
          <Circle courses={courses} />
        </div>
        <div className='col-span-4 mt-2 flex flex-col lg:col-span-2 lg:mt-0'>
          <AnimatedText
            text='Get instant access to all courses.'
            className='mb-5 text-center lg:text-left'
          />
          <div className='my-4 ms-auto flex w-full items-center justify-center gap-4 lg:my-5 lg:justify-start lg:gap-8'>
            <Link
              className='flex
              h-12 w-52
              items-center justify-center
              rounded-2xl bg-gradient-to-r from-pink-500
              via-red-500 
              to-yellow-500 
              p-[0.1rem] transition-["scale"] duration-300
                hover:scale-105 lg:h-20 lg:w-72
                '
              href='/courses'
            >
              <span
                className='inline-flex h-full w-full 
                items-center justify-center rounded-2xl
                   bg-white dark:bg-slate-950'
              >
                <span
                  className='bg-gradient-to-r
                 from-pink-500 via-red-500 to-yellow-500 
                 bg-clip-text text-sm font-extrabold
                 text-transparent lg:text-xl'
                >
                  Check your free courses!
                </span>
              </span>
            </Link>
            <a
              className='bg-gradient-to-r
               from-pink-500 via-red-500 to-yellow-500
                bg-clip-text text-sm font-bold text-transparent
                transition-["scale"] duration-300 hover:scale-110 lg:text-xl'
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
      slug
      image {
        id
        url
      }
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
