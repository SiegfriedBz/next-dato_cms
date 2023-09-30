import { RootLayout } from '@/components/layouts/RootLayout'
import { Analytics } from '@vercel/analytics/react'
import '@/styles/globals.css'

export default function App({ Component, pageProps }) {
  return (
    <main className='min-h-screen dark:bg-slate-900 dark:text-stone-100'>
      <RootLayout
        socialUmageUrl={`https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/w_1200,h_630/v1695809496/webwizzards/og_social_webwizzards`}
      >
        <Component {...pageProps} />
        <Analytics />
      </RootLayout>
    </main>
  )
}
