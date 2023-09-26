import Navbar from '../Navbar'
import Footer from '../Footer'

export const RootLayout = ({ children }) => {
  return (
    <>
      <Navbar />
      <main className='container mx-auto h-screen p-8'>{children}</main>
      <Footer />
    </>
  )
}
