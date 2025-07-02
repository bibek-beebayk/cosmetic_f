'use client'

import BestSellers from '@/sections/BestSellers'
import BlogSection from '@/sections/BlogSection'
import BrandsSection from '@/sections/BrandsSection'
import HeroSlider from '@/sections/HeroSlider'
import NewArrivals from '@/sections/NewArrivals'
import ShopByCategory from '@/sections/ShopByCategory'
import {useEffect, useState} from 'react'
import {apiCall} from '@/lib/axios'
import { Banner, BrandData, CategoryData, ProductList } from '@/types/core'

type HomepageData = {
  banners: Banner[]
  new_arrivals: ProductList[]
  best_sellers: ProductList[]
  brands: BrandData[]
  categories: CategoryData[]
  blogPosts: { title: string, slug: string, image: string }[]
}

export default function Home() {
  const [homepageData, setHomepageData] = useState<HomepageData>();

  useEffect(() => {
    const fetchHomepageData = async () => {
      try {
        const data = await apiCall<HomepageData>('get', '/home/');
        setHomepageData(data);
      } catch (error) {
        console.error('Error fetching homepage data:', error);
      }
    };

    fetchHomepageData();
  }, []);

  return (
    <main>
      <HeroSlider banners={homepageData?.banners}/>
      <NewArrivals newArrivals={homepageData?.new_arrivals}/>
      <BrandsSection brands={homepageData?.brands}/>
      <BestSellers bestSellers={homepageData?.best_sellers}/>
      <ShopByCategory categories={homepageData?.categories}/>
      <BlogSection />
      {/* More sections here */}
    </main>
  )
}
