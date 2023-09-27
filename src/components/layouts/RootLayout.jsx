import Navbar from '../Navbar'
import Footer from '../Footer'
import Head from 'next/head'
import { useRouter } from 'next/router'

export const RootLayout = (props) => {
  const { children, ...customMeta } = props
  const router = useRouter()

  const meta = {
    canonicalUrl: `https://webwizzards.vercel.app${router.asPath}`,
    ...customMeta,
  }

  return (
    <>
      <Head>
        <meta property='og:url' content={meta.canonicalUrl} />
        <link rel='canonical' href={meta.canonicalUrl} />
        <meta property='og:image' content={meta.socialUmageUrl} />
      </Head>
      <Navbar />
      <main className='bg-white px-8 py-8 dark:bg-slate-950 dark:text-white sm:px-12 md:px-24 lg:px-12 xl:px-32'>
        {children}
      </main>
      <Footer />
    </>
  )
}
