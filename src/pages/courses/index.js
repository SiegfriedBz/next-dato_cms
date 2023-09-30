import Link from 'next/link'
import { gql } from 'graphql-request'
import { performRequest } from '@/lib/dato'
import { Image } from 'react-datocms'

export default function Courses({ courses }) {
  return (
    <section
      id='courses'
      className='grid grid-cols-1 
        items-center justify-center 
         gap-6
          lg:grid-cols-2 2xl:grid-cols-3'
    >
      {courses?.map((course) => {
        return (
          <div
            key={course.id}
            className='group flex h-96 w-full rounded-2xl bg-gradient-to-r 
              from-pink-500 
              via-red-500 
              to-yellow-500 p-[0.2rem] hover:shadow-2xl dark:p-[0.025rem] 
              dark:shadow-sm dark:shadow-slate-100 dark:hover:shadow-md
              dark:hover:shadow-stone-100
              sm:h-72'
          >
            <div
              className='col-span-1
                h-full w-full items-center justify-center
                rounded-2xl 
                bg-stone-100 
                shadow-xl
                dark:bg-slate-900
                dark:text-stone-100'
            >
              <div className='grid h-full w-full grid-cols-4 items-center justify-center'>
                <div
                  className='col-span-4 mx-auto mt-3 
                    h-52 w-52
                    rounded-full p-5
                    shadow-xl group-hover:shadow-2xl dark:shadow-sm 
                    dark:shadow-slate-100 
                    dark:group-hover:shadow-md dark:group-hover:shadow-stone-100 
                    sm:col-span-2 sm:mt-0'
                >
                  <Image
                    data={course.image.responsiveImage}
                    alt={course.name}
                    className={`shadow-3xl h-full w-full rounded-full object-contain p-1 ${
                      course.name.includes('Next.JS') ? 'dark:bg-stone-100' : ''
                    }`}
                  />
                </div>
                <Link
                  href={`/courses/${course.slug}`}
                  className='col-span-4 mx-2 my-3 flex flex-col items-center justify-center sm:col-span-2 sm:mx-auto'
                >
                  <span
                    className='mx-auto inline-block
                      w-full text-center text-xl font-bold text-slate-900/75
                    group-hover:text-slate-900 dark:text-stone-100/80
                    dark:group-hover:text-stone-100/90
                      sm:text-2xl lg:text-xl xl:text-2xl 2xl:text-xl'
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
                      sm:text-4xl lg:text-3xl 2xl:text-2xl'
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
        responsiveImage(
          imgixParams: { fit: crop, w: 300, h: 300, auto: format }
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
