import Link from 'next/link'
import Head from 'next/head'
import { gql } from 'graphql-request'
import { performRequest } from '@/lib/dato'
import Circle from '@/components/Circle'
import { AnimatedText } from '@/components/AnimatedText'

const meta = {
  title: 'WebWizzards | Home',
  description:
    'WebWizzards is a platform where you can find the best courses for web development.',
}

export default function Home({ courses }) {
  return (
    <>
      <Head>
        <title>{meta.title}</title>
        <meta content={meta.description} name='description' />
        <meta property='og:description' content={meta.description} />
        <meta property='og:title' content={meta.title} />
      </Head>
      <section
        id='hero'
        className='grid w-full grid-cols-4 flex-col items-center justify-center lg:my-8 lg:flex-row lg:gap-x-16'
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
                  bg-transparent dark:bg-slate-950'
              >
                <span
                  className='text-sm
                 font-extrabold text-white dark:bg-gradient-to-r dark:from-pink-500 
                 dark:via-red-500 dark:to-yellow-500 dark:bg-clip-text
                 dark:text-transparent lg:text-xl'
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
        responsiveImage(
          imgixParams: { fit: crop, w: 150, h: 150, auto: format }
        ) {
          src
          width
          height
          # blur-up placeholder, JPEG format, base64-encoded, or...
          base64
          # background color placeholder
          bgColor
          sizes
        }
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
