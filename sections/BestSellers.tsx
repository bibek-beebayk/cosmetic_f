'use client'

import ProductCard from '@/components/ProductCard'
import { ProductList } from '@/types/core'
import Link from 'next/link'
import { FaHeart, FaStar } from 'react-icons/fa'

// const bestSellers = [
//   {
//     id: 1,
//     name: 'Velvet Matte Lipstick',
//     brand: 'Luxe Beauty',
//     slug: 'velvet-matte-lipstick',
//     image: '/products/bestseller1.jpg',
//     price: 21.00,
//     rating: 4.9,
//   },
//   {
//     id: 2,
//     name: 'Ultra Hydrating Cream',
//     brand: 'HydraGlow',
//     slug: 'ultra-hydrating-cream',
//     image: '/products/bestseller1.jpg',
//     price: 36.00,
//     rating: 4.7,
//   },
//   {
//     id: 3,
//     name: 'Volumizing Mascara',
//     brand: 'Lash & Brow',
//     image: '/products/bestseller1.jpg',
//     slug: 'volumizing-mascara',
//     price: 18.00,
//     rating: 4.6,
//   },
//   {
//     id: 4,
//     name: 'Daily Glow Toner',
//     brand: 'Glow Essentials',
//     slug: 'daily-glow-toner',
//     image: '/products/bestseller1.jpg',
//     price: 25.00,
//     rating: 4.8,
//   },
// ]

type Props = {  bestSellers?: ProductList[]} 

export default function BestSellers({bestSellers = [] }: Props) {
  return (
    <section className="py-10 px-4 max-w-7xl mx-auto">
      <h2 className="text-2xl font-semibold mb-6 text-center">Bestsellers</h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {bestSellers.map((product) => (
          <ProductCard key={product.slug} product={product} showAddToCart={true} showWishlist={true} />
        ))}
      </div>
    </section>
  )
}
