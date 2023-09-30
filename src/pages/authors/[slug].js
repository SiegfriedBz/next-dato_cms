import { useRouter } from 'next/router'
import { performRequest } from '@/lib/dato'
import { gql } from 'graphql-request'
import { Image } from 'react-datocms'
import Link from 'next/link'

const Author = ({ author }) => {
  const router = useRouter()

  if (router.isFallback) {
    return <div>Loading...</div>
  }

  return (
    <section
      id={`author-${author.name}`}
      className='flex w-full flex-col items-center justify-center gap-2 md:flex-row md:gap-4'
    >
      <div
        key={author.id}
        className='flex w-full
          min-w-[18rem] max-w-[24rem] flex-col
           items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-pink-500 
           via-red-500 
           to-yellow-500 
           p-4 md:gap-4'
      >
        <Link
          href={`/author/${author.slug}`}
          className='flex w-full flex-col items-center gap-y-3'
        >
          <h1
            className='text-bold bg-gradient-to-r
              from-yellow-400 to-stone-50
               bg-clip-text
               text-3xl font-extrabold text-transparent md:text-5xl'
          >
            {author.name}
          </h1>
          <Image
            data={author.avatar.responsiveImage}
            alt={author.name}
            className='rounded-full border border-stone-50 bg-stone-50/75 p-8 shadow-2xl dark:bg-slate-900/25'
          />
          <br />
        </Link>
        <div
          className='flex
               w-full flex-col items-center 
               gap-y-3
               bg-gradient-to-r from-yellow-400 to-stone-50 bg-clip-text text-transparent'
        >
          <Link
            href='/courses'
            className='text-bold text-2xl font-extrabold underline underline-offset-2 md:text-3xl'
          >
            Courses
          </Link>
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
        </div>
        <div
          className='flex
               w-full flex-col items-center 
               gap-y-3
               bg-gradient-to-r from-yellow-400 to-stone-50 bg-clip-text text-transparent'
        >
          <h2 className='text-bold text-2xl font-extrabold md:text-3xl'>Bio</h2>
          <p className='text-bold text-justify text-base font-extrabold md:text-lg'>
            {author.bio}
          </p>
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
