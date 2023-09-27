import { useRouter } from 'next/router'
import { performRequest } from '@/lib/dato'
import { gql } from 'graphql-request'
import { Image } from 'react-datocms'

const Author = ({ author }) => {
  const router = useRouter()

  //   author {
  //     id: '202036870',
  //     name: 'Mario',
  //     bio: { value: { schema: 'dast', document: [Object] } },
  //     avatar: {
  //       id: '73094491',
  //       url: 'https://www.datocms-assets.com/106424/1695636561-mario.jpeg'
  //     }
  //   }

  if (router.isFallback) {
    return <div>Loading...</div>
  }

  return (
    <section id={`author-${author.name}`} className=''>
      Author
      <h2>{author.name}</h2>
    </section>
  )
}

export default Author

const allSlugsQuery = gql`
  {
    allAuthors {
      slug
    }
  }
`

export async function getStaticPaths() {
  const { data } = await performRequest({ query: allSlugsQuery })

  return {
    paths: data?.allAuthors?.map((author) => `/authors/${author.slug}`) || [],
    fallback: true,
  }
}

const authorQuery = gql`
  query authorQuery($arg1: String) {
    author(filter: { slug: { eq: $arg1 } }) {
      id
      name
      bio {
        value
      }
      avatar {
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
