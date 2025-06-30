import BestSellers from '@/sections/BestSellers'
import BlogSection from '@/sections/BlogSection'
import BrandsSection from '@/sections/BrandsSection'
import HeroSlider from '@/sections/HeroSlider'
import NewArrivals from '@/sections/NewArrivals'
import ShopByCategory from '@/sections/ShopByCategory'

export default function Home() {
  return (
    <main>
      <HeroSlider />
      <NewArrivals />
      <BrandsSection />
      <BestSellers />
      <ShopByCategory />
      <BlogSection />
      {/* More sections here */}
    </main>
  )
}
