import { Providers } from '@/app/providers'
import Footer from '@/components/Footer'
// import Header from '@/components/Header'
import { Poppins } from 'next/font/google'
import './globals.css'
import { Toaster } from 'react-hot-toast'
import { Suspense } from 'react'
import Header from '@/components/Header'
import LoadingSpinner from '@/components/LoadingSpinner'

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
          <Suspense fallback={<LoadingSpinner />}>
            <Header />
            <div>
              <Toaster />
            </div>
            {children}
            <Footer />
          </Suspense>
        </Providers>
      </body>
    </html>
  )
}
