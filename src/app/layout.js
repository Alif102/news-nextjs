import { Inter } from 'next/font/google';
import './globals.css';
import Naavbar from './Components/Navbar';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'News Portal',
  openGraph: {
    title: 'News Portal',
    description: 'News Portal is a...',
    url: 'https://news-nextjs-phi.vercel.app',
    type: 'website',
  },
} 

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      
      
     
      <body className={inter.className}>
        <div className='container mx-auto px-4'>
        <Naavbar/>
        {children}
        </div>
        </body>
    </html>
  )
}

