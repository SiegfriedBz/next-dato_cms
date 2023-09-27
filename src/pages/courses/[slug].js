import { useRouter } from 'next/router'
import { performRequest } from '@/lib/dato'
import { gql } from 'graphql-request'
import {
  OmniSection,
  HeaderSection,
  LearnSection,
  PriceSection,
  CalloutSection,
} from '@/components/course'

const mapTypeNameToSection = new Map([
  ['CourseHeaderSectionRecord', HeaderSection],
  ['CourseLearnSectionRecord', LearnSection],
  ['CourseCalloutSectionRecord', CalloutSection],
  ['CoursePriceSectionRecord', PriceSection],
])

const Course = ({ course }) => {
  const router = useRouter()

  if (router.isFallback) {
    return <div>Loading...</div>
  }

  return (
    <section id={`course-${course?.name}`} className=''>
      {course?.OmniSection?.map((detail) => {
        return (
          <OmniSection
            As={mapTypeNameToSection.get(detail.__typename)}
            detail={detail}
            key={detail.id}
          />
        )
      })}
    </section>
  )
}

export default Course

const allSlugsQuery = gql`
  {
    allCourses {
      slug
    }
  }
`

export async function getStaticPaths() {
  const { data } = await performRequest({ query: allSlugsQuery })

  return {
    paths: data?.allCourses?.map((course) => `/courses/${course.slug}`) || [],
    fallback: true,
  }
}

const courseQuery = gql`
  query courseQuery($arg1: String) {
    course(filter: { slug: { eq: $arg1 } }) {
      id
      name
      smallTitle
      image {
        id
        url
      }
      slug
      courseDetail {
        ... on CourseHeaderSectionRecord {
          __typename
          id
          buttonText
          description
        }
        ... on CourseLearnSectionRecord {
          __typename
          id
          title
          numberOfLessons
          hoursOfContent
          learningPoint {
            id
            title
          }
        }

        ... on CourseCalloutSectionRecord {
          __typename
          id
          smallTitle
          bigTitle
          description
        }

        ... on CoursePriceSectionRecord {
          __typename
          id
          title
          priceCards {
            id
            title
            description
            finePrint
            featured
            isFree
            buttonText
            priceInCents
            priceSuffix
          }
        }
      }
      courseAuthor {
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
  }
`

export async function getStaticProps({ params: { slug } }) {
  const {
    data: { course },
  } = await performRequest({
    query: courseQuery,
    variables: { arg1: slug },
  })

  return {
    props: { course },
    // Next.js will attempt to call getStaticProps
    // and re-generate
    // the page when a request comes in
    // at most once every 60 seconds
    // revalidate: 60,
  }
}
