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
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <script src="https://jsc.mgid.com/site/556728.js" async></script>
      </head>
      <body className={inter.className}>
        <div className="container lg:max-w-6xl md:max-w-4xl mx-auto">
          <Naavbar />
          
          {children}
        </div>
      </body>
    </html>
  );
}
