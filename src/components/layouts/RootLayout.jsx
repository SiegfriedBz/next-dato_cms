import Navbar from '../Navbar'
import Footer from '../Footer'

export const RootLayout = ({ children }) => {
  return (
    <div className='container mx-auto min-h-screen'>
      <Navbar />
      <main className='p-8'>{children}</main>
      <Footer />
    </div>
  )
}
