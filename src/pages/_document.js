import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang='en' className='scroll-smooth'>
      <Head>
        <meta name='viewport' content='width=device-width,initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
        <meta name='robots' content='follow, index' />
        <meta name='keywords' content='WebWizzards'></meta>
        <meta property='og:site_name' content='WebWizzards' />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
