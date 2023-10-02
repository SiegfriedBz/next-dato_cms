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
        <meta name='viewport' content='width=device-width,initial-scale=1' />
        <meta charSet='utf-8' />
        <meta name='robots' content='follow, index' />
        <meta property='og:url' content={meta.canonicalUrl} />
        <link rel='canonical' href={meta.canonicalUrl} />
        <meta property='og:image' content={meta.socialUmageUrl} />
      </Head>
      <Navbar />
      <main className='min-h-[76vh] bg-stone-100 px-8 py-6 dark:bg-slate-900 dark:text-stone-100 sm:px-12 md:px-24 lg:px-12 xl:px-32'>
        {children}
      </main>
      <Footer />
    </>
  )
}
