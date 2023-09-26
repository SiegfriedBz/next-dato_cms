import { useRouter } from 'next/router'
import { performRequest } from '@/lib/dato'
import { gql } from 'graphql-request'
import Image from 'next/image'
import Link from 'next/link'

const Authors = ({ authors }) => {
  const router = useRouter()

  // authors [
  //   {
  //     id: '202036873',
  //     name: 'Luigi',
  //     bio: { value: [Object] },
  //     avatar: {
  //       id: '73094490',
  //       url: 'https://www.datocms-assets.com/106424/1695636556-luigi.jpeg'
  //     }
  //   },
  //   {
  //     id: '202036870',
  //     name: 'Mario',
  //     bio: { value: [Object] },
  //     avatar: {
  //       id: '73094491',
  //       url: 'https://www.datocms-assets.com/106424/1695636561-mario.jpeg'
  //     }
  //   }
  // ]

  if (router.isFallback) {
    return <div>Loading...</div>
  }

  return (
    <section id='authors' className='grid w-full grid-cols-4 md:gap-16'>
      {authors.map((author) => {
        return (
          <Link
            href={`/authors/${author.slug}`}
            key={author.id}
            className='col-span-2 flex min-h-[280px] w-full flex-col items-center justify-start rounded-2xl border border-slate-950 p-4'
          >
            <h1 className='text-bold text-3xl'>{author.name}</h1>
            <Image
              width={75}
              height={75}
              src={author.avatar.url}
              alt={author.name}
            />
            Bio
            <br />
            Courses
          </Link>
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
        url
      }
    }
  }
`

export async function getStaticProps() {
  const { data } = await performRequest({
    query: allAuthorsQuery,
  })

  console.log('data', data)

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
