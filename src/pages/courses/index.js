import Link from 'next/link'
import { gql } from 'graphql-request'
import { performRequest } from '@/lib/dato'
import Image from 'next/image'

export default function Courses({ courses }) {
  return (
    <section
      id='courses'
      className='grid grid-cols-1 items-center justify-center gap-3 md:gap-6 lg:grid-cols-2 2xl:grid-cols-3'
    >
      {courses?.map((course) => {
        return (
          <div
            key={course.id}
            className='group col-span-1 flex h-80 flex-col items-center justify-center gap-3 rounded-2xl border-[1px] border-slate-950 shadow-xl hover:shadow-2xl dark:border-white dark:bg-slate-950 dark:text-white dark:shadow-sm dark:shadow-slate-100 dark:hover:border-white dark:hover:shadow-md dark:hover:shadow-white md:h-64 md:flex-row'
          >
            <div className='flex h-48 w-48 items-center justify-center rounded-full p-2 shadow-xl group-hover:shadow-2xl dark:shadow-sm dark:shadow-slate-100 dark:group-hover:shadow-md dark:group-hover:shadow-white'>
              <Image
                src={course.image.url}
                width={150}
                height={150}
                alt={course.name}
                className={`shadow-3xl rounded-full object-contain p-1 ${
                  course.name.includes('Next.JS') ? 'dark:bg-white' : ''
                }`}
              />
            </div>
            <Link href={`/courses/${course.slug}`} className='w-1/2'>
              <span className='inline-block w-full items-center justify-center text-2xl font-bold text-slate-950/75 group-hover:text-slate-950 dark:text-white/90 dark:group-hover:text-white'>
                {course.name}
              </span>
            </Link>
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
      image {
        id
        url
      }
      slug
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
