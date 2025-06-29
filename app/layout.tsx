import Header from '@/components/Header'
import './globals.css'
import { Poppins } from 'next/font/google'
import Footer from '@/components/Footer'

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
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  )
}
