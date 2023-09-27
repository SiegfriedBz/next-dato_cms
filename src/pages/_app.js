import { RootLayout } from '@/components/layouts/RootLayout'
import '@/styles/globals.css'

export default function App({ Component, pageProps }) {
  return (
    <main className='min-h-screen dark:bg-slate-950 dark:text-white'>
      <RootLayout socialUmageUrl='https://www.datocms-assets.com/106424/1695806542-og_social.png'>
        <Component {...pageProps} />
      </RootLayout>
    </main>
  )
}
