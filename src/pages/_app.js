import { RootLayout } from '@/components/layouts/RootLayout'
import '@/styles/globals.css'

export default function App({ Component, pageProps }) {
  return (
    <div className='dark:bg-slate-950 dark:text-white'>
      <RootLayout>
        <Component {...pageProps} />
      </RootLayout>
    </div>
  )
}
