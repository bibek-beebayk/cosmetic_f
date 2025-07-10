'use client'

import { useEffect, useState } from 'react'
import { useAuth } from '@/context/AuthContext'
import { apiCall } from '@/lib/axios'
import { Banner, BrandData, CategoryData, ProductList } from '@/types/core'
import LoadingSpinner from '@/components/LoadingSpinner'
import BestSellers from '@/sections/BestSellers'
import BlogSection from '@/sections/BlogSection'
import BrandsSection from '@/sections/BrandsSection'
import HeroSlider from '@/sections/HeroSlider'
import NewArrivals from '@/sections/NewArrivals'
import ShopByCategory from '@/sections/ShopByCategory'
import Link from 'next/link'

type HomepageData = {
  banners: Banner[]
  new_arrivals: ProductList[]
  best_sellers: ProductList[]
  brands: BrandData[]
  categories: CategoryData[]
  blogPosts: { title: string, slug: string, image: string }[]
}

export default function Home() {
  const [homepageData, setHomepageData] = useState<HomepageData>()
  const { isAuthenticated } = useAuth()
  const [showPopup, setShowPopup] = useState(false)

  useEffect(() => {
    const fetchHomepageData = async () => {
      try {
        const data = await apiCall<HomepageData>('get', '/home/')
        setHomepageData(data)
      } catch (error) {
        console.error('Error fetching homepage data:', error)
      }
    }

    fetchHomepageData()
  }, [])

  useEffect(() => {
    const popupShownRecently = localStorage.getItem('popupLastShown')
    const now = Date.now()
    const oneHour = 1 * 60 * 60 * 1000

    if (!isAuthenticated && (!popupShownRecently || now - parseInt(popupShownRecently) > oneHour)) {
      const timer = setTimeout(() => {
        setShowPopup(true)
        localStorage.setItem('popupLastShown', now.toString())
      }, 5000)

      return () => clearTimeout(timer)
    }
  }, [isAuthenticated])

  if (!homepageData) {
    return <LoadingSpinner />
  }

  return (
    <main>
      <HeroSlider banners={homepageData?.banners} />
      <NewArrivals newArrivals={homepageData?.new_arrivals} />
      <BrandsSection brands={homepageData?.brands} />
      <BestSellers bestSellers={homepageData?.best_sellers} />
      <ShopByCategory categories={homepageData?.categories} />
      <BlogSection />

      {showPopup && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-sm rounded-lg shadow-lg p-6 relative text-center">
            <button
              onClick={() => setShowPopup(false)}
              className="absolute top-2 right-3 text-gray-500 hover:text-red-500 text-xl"
            >
              ×
            </button>
            <h2 className="text-lg font-semibold mb-2">Welcome to Beauty Corner!</h2>
            <p className="text-sm text-gray-600 mb-4">Log in to enjoy more features and exciting offers.</p>
            <Link
              href="/login"
              className="inline-block bg-red-500 hover:bg-pink-600 text-white font-semibold py-2 px-4 rounded text-sm"
            >
              Log In Now
            </Link>
          </div>
        </div>
      )}
    </main>
  )
}
