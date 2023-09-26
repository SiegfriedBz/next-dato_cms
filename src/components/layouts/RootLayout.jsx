import Navbar from '../Navbar'
import Footer from '../Footer'

export const RootLayout = ({ children }) => {
  return (
    <>
      <Navbar />
      <main className='bg-white px-8 py-8 dark:bg-slate-950 dark:text-white sm:px-12 md:px-24 lg:px-12 xl:px-32'>
        {children}
      </main>
      <Footer />
    </>
  )
}
