import Link from 'next/link'
import { gql } from 'graphql-request'
import { performRequest } from '@/lib/dato'
import Image from 'next/image'

export default function Courses({ courses }) {
  return (
    <section
      id='courses'
      className='grid grid-cols-1 
        items-center justify-center 
         gap-12
          lg:grid-cols-2 2xl:grid-cols-3'
    >
      {courses?.map((course) => {
        return (
          <div
            key={course.id}
            className='flex h-96 w-full rounded-2xl bg-gradient-to-r 
              from-pink-500 
              via-red-500 
              to-yellow-500 p-[0.1rem] hover:shadow-2xl dark:p-[0.025rem] 
              dark:shadow-sm dark:shadow-slate-100 dark:hover:shadow-md
              dark:hover:shadow-white
              sm:h-72'
          >
            <div
              className='group col-span-1
                h-full w-full items-center justify-center
                rounded-2xl 
                bg-white 
                shadow-xl
                dark:bg-slate-950
                dark:text-white'
            >
              <div className='grid h-full w-full grid-cols-4 items-center justify-center'>
                <div
                  className='col-span-4 mx-auto mt-3 
                    h-52 w-52
                    rounded-full p-2
                    shadow-xl group-hover:shadow-2xl dark:shadow-sm 
                    dark:shadow-slate-100 
                    dark:group-hover:shadow-md dark:group-hover:shadow-white 
                    sm:col-span-2 sm:mt-0'
                >
                  <Image
                    src={course.image.url}
                    width={150}
                    height={150}
                    alt={course.name}
                    className={`shadow-3xl h-full w-full rounded-full object-contain p-1 ${
                      course.name.includes('Next.JS') ? 'dark:bg-white' : ''
                    }`}
                  />
                </div>
                <Link
                  href={`/courses/${course.slug}`}
                  className='col-span-4 mx-5 my-3 flex flex-col items-center justify-center sm:col-span-2 sm:mx-auto'
                >
                  <span
                    className='mx-auto inline-block
                  w-full text-center text-xl font-bold text-slate-950/75
                 group-hover:text-slate-950 dark:text-white/80
                  dark:group-hover:text-white/90
                  sm:text-2xl lg:text-xl xl:text-2xl 2xl:text-xl
                  '
                  >
                    {course.smallTitle}
                  </span>
                  <span
                    className='mx-auto mt-3 inline-block
                  w-full 
                  bg-gradient-to-r from-pink-500 via-red-500 
                  to-yellow-500
                  bg-clip-text text-center text-3xl
                  font-bold text-transparent
                  transition-["scale"] duration-300 group-hover:scale-110
                  sm:mt-5 
                  sm:text-4xl lg:text-3xl xl:text-4xl 2xl:text-3xl
                  '
                  >
                    {course.name}
                  </span>
                </Link>
              </div>
            </div>
          </div>
        )
      })}
    </section>
  )
}

const allCoursesShortQuery = gql`
  {
    allCourses {
      id
      name
      smallTitle
      slug
      image {
        id
        url(imgixParams: { fm: jpg })
        width
        height
        colors {
          hex
        }
      }
      courseAuthor {
        id
        name
      }
      courseDetail {
        ... on CourseCalloutSectionRecord {
          __typename
          id
          smallTitle
          bigTitle
          description
        }
      }
    }
  }
`

export async function getStaticProps() {
  const { data } = await performRequest({
    query: allCoursesShortQuery,
  })

  return {
    props: {
      courses: data.allCourses || [],
    },
  }
}
