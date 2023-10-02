import { useRouter } from 'next/router'
import { performRequest } from '@/lib/dato'
import { gql } from 'graphql-request'
import { Image } from 'react-datocms'
import Link from 'next/link'
import { AnimatedText } from '@/components/AnimatedText'

const Author = ({ author }) => {
  const router = useRouter()

  if (router.isFallback) {
    return <div>Loading...</div>
  }

  return (
    <section id={author.id}>
      <AnimatedText
        text={author.name}
        className='text-center text-3xl lg:text-4xl'
      />
      <div className='flex flex-col flex-wrap items-center justify-center gap-8 md:flex-row md:gap-16'>
        <div
          className='group flex min-w-[18rem]
            max-w-[24rem] flex-col
            items-center justify-start
            rounded-2xl 
            bg-gradient-to-r
          from-pink-500 
          via-red-500 
          to-yellow-500
            p-4
            shadow-sm 
          shadow-stone-100/75
            hover:shadow-md
          group-hover:shadow-stone-100/75 
          dark:shadow-slate-100/50
          dark:hover:shadow-slate-100/50
          '
        >
          <Link
            href={`/authors/${author.slug}`}
            className='flex w-full flex-col 
              items-center 
              gap-y-3'
          >
            <Image
              data={author.avatar.responsiveImage}
              alt={author.name}
              className='rounded-full 
                bg-stone-100/75
                  p-8
                  shadow-sm

                  shadow-stone-100/75
                  transition-all
                  duration-300 
                  ease-in-out
           
                group-hover:shadow-md

                group-hover:shadow-stone-100/75
                dark:bg-slate-100/50 
                dark:shadow-slate-100/50
                group-hover:dark:shadow-slate-100/50
                  '
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
          <div
            className='flex
               w-full flex-col items-center 
               gap-y-3
               bg-gradient-to-r from-yellow-400 to-stone-50 bg-clip-text text-transparent'
          >
            <h2 className='text-bold text-2xl font-extrabold md:text-3xl'>
              Bio
            </h2>
            <p className='text-bold text-justify text-base font-extrabold md:text-lg'>
              {author.bio}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Author

const allSlugsQuery = gql`
  {
    allauthor {
      slug
    }
  }
`

export async function getStaticPaths() {
  const { data } = await performRequest({ query: allSlugsQuery })

  return {
    paths: data?.allauthor?.map((author) => `/author/${author.slug}`) || [],
    fallback: true,
  }
}

const authorQuery = gql`
  query authorQuery($arg1: String) {
    author(filter: { slug: { eq: $arg1 } }) {
      id
      name
      slug
      bio
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

export async function getStaticProps({ params: { slug } }) {
  const {
    data: { author },
  } = await performRequest({
    query: authorQuery,
    variables: { arg1: slug },
  })

  return {
    props: { author },
    // Next.js will attempt to call getStaticProps
    // and re-generate
    // the page when a request comes in
    // at most once every 60 seconds
    // revalidate: 60,
  }
}
