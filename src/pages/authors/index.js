import { useRouter } from 'next/router'
import { performRequest } from '@/lib/dato'
import { gql } from 'graphql-request'
import { Image } from 'react-datocms'
import Link from 'next/link'
import { AnimatedText } from '@/components/AnimatedText'

const Authors = ({ authors }) => {
  const router = useRouter()

  if (router.isFallback) {
    return <div>Loading...</div>
  }

  return (
    <section id='authors'>
      <AnimatedText
        text='Authors'
        className='text-center text-3xl lg:text-4xl'
      />
      <div className='flex flex-col flex-wrap items-center justify-center gap-8 md:flex-row md:gap-16'>
        {authors.map((author) => {
          return (
            <div
              key={author.id}
              className='group flex min-w-[18rem]
            max-w-[24rem] flex-col
             items-center justify-start rounded-2xl bg-gradient-to-r from-pink-500 
             via-red-500 
             to-yellow-500 p-4 hover:shadow-xl dark:shadow-sm dark:shadow-slate-100
             dark:hover:shadow-md
             dark:hover:shadow-stone-100'
            >
              <Link
                href={`/authors/${author.slug}`}
                className='flex w-full flex-col 
                items-center 
                gap-y-3'
              >
                <h1
                  className='text-bold transform
                bg-gradient-to-r from-yellow-400
                 to-stone-50 bg-clip-text
                 text-3xl font-extrabold text-transparent
                 transition-all duration-300 ease-in-out group-hover:scale-110 md:text-5xl'
                >
                  {author.name}
                </h1>
                <Image
                  data={author.avatar.responsiveImage}
                  alt={author.name}
                  className='rounded-full 
                    bg-stone-100/75 p-8 shadow-lg
                      group-hover:shadow-xl
                    dark:bg-slate-700/50 dark:shadow-sm
                    dark:shadow-slate-100/75
                    dark:group-hover:shadow-md 
                    dark:group-hover:shadow-stone-100'
                />
                <br />
              </Link>
              <div
                className='flex
                 w-full flex-col items-center 
                 gap-y-3
                 bg-gradient-to-r from-yellow-400 to-stone-50 bg-clip-text text-transparent'
              >
                {author?._allReferencingCourses.length > 0 && (
                  <>
                    <h2 className='text-bold text-2xl font-extrabold md:text-3xl'>
                      Courses
                    </h2>
                    {author._allReferencingCourses.map((course) => {
                      return (
                        <Link
                          className='text-bold text-lg font-extrabold md:text-xl'
                          href={`/courses/${course.slug}`}
                          key={course.id}
                        >
                          {course.name}
                        </Link>
                      )
                    })}
                  </>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}

export default Authors

const allAuthorsQuery = gql`
  {
    allAuthors {
      id
      name
      slug
      avatar {
        id
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
      _allReferencingCourses {
        id
        name
        slug
      }
    }
  }
`

export async function getStaticProps() {
  const { data } = await performRequest({
    query: allAuthorsQuery,
  })

  const authors = data?.allAuthors || []

  return {
    props: { authors },
    // Next.js will attempt to call getStaticProps
    // and re-generate
    // the page when a request comes in
    // at most once every 60 seconds
    // revalidate: 60,
  }
}
