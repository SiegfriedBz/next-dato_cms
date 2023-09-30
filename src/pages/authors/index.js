import { useRouter } from 'next/router'
import { performRequest } from '@/lib/dato'
import { gql } from 'graphql-request'
import { Image } from 'react-datocms'
import Link from 'next/link'

const Authors = ({ authors }) => {
  const router = useRouter()
  console.log(authors[0]._allReferencingCourses)
  // id: '202036870',
  // name: 'Mario',
  // slug: 'mario',
  // bio: { value: [Object] },
  // avatar: { id: '73782580', responsiveImage: [Object] },
  // _allReferencingCourses: [ [Object], [Object], [Object], [Object] ]

  if (router.isFallback) {
    return <div>Loading...</div>
  }

  return (
    <section
      id='authors'
      className='flex w-full flex-col items-center justify-center gap-8 md:flex-row md:gap-16'
    >
      {authors.map((author) => {
        return (
          <div
            key={author.id}
            className='flex w-full
            min-w-[18rem] max-w-[24rem] flex-col
             items-center justify-center rounded-2xl bg-gradient-to-r from-pink-500 
             via-red-500 
             to-yellow-500 
             p-4'
          >
            <Link
              href={`/authors/${author.slug}`}
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
            </div>
          </div>
        )
      })}
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
      bio {
        value
      }
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
