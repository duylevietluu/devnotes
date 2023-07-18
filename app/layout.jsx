
import Navbar from '@/components/Navbar'
import './globals.css'
import { Toaster } from 'react-hot-toast'
import Provider from '@/components/Provider';

const title = 'Dev Notes';
const description = 'A social media platform for developers';
const image = '/logo.png';

export const metadata = {
  title,
  description,
  image,
  keywords: ['social media, friends, developers, devnotes'],
  twitter: {
    card: "summary",
    site: "@nhanRlathang",
    title,
    description,
    image,
  },
  og: {
    title,
    description,
    image,
  }
}

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <Provider>
        <body>
          <Navbar />
          <Toaster />
          <main>
            {children}
          </main>
        </body>
      </Provider>
    </html>
  )
}

export default RootLayout;