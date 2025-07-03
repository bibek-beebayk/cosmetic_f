import { Providers } from '@/app/providers'
import Footer from '@/components/Footer'
import Header from '@/components/Header'
import { Poppins } from 'next/font/google'
import './globals.css'
import { Toaster } from 'react-hot-toast'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-poppins',
})

export const metadata = {
  title: 'Beauty Corner',
  description: 'Products that bring perfect beauty.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${poppins.variable}`}>
      <body className="bg-white text-gray-900 font-sans">
        <Providers>
          <Header />
          <div>
            <Toaster />
          </div>
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  )
}
