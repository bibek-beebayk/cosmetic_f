'use client'

import Link from 'next/link'
import { FaHeart, FaStar } from 'react-icons/fa'

const bestSellers = [
  {
    id: 1,
    name: 'Velvet Matte Lipstick',
    slug: 'velvet-matte-lipstick',
    image: '/products/bestseller1.jpg',
    price: '$21.00',
    rating: 4.9,
  },
  {
    id: 2,
    name: 'Ultra Hydrating Cream',
    slug: 'ultra-hydrating-cream',
    image: '/products/bestseller1.jpg',
    price: '$36.00',
    rating: 4.7,
  },
  {
    id: 3,
    name: 'Volumizing Mascara',
    image: '/products/bestseller1.jpg',
    slug: 'volumizing-mascara',
    price: '$18.00',
    rating: 4.6,
  },
  {
    id: 4,
    name: 'Daily Glow Toner',
    slug: 'daily-glow-toner',
    image: '/products/bestseller1.jpg',
    price: '$25.00',
    rating: 4.8,
  },
]

export default function BestSellers() {
  return (
    <section className="py-10 px-4 max-w-7xl mx-auto">
      <h2 className="text-2xl font-semibold mb-6 text-center">Bestsellers</h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {bestSellers.map((product) => (
          <div key={product.id} className="relative group border rounded-md p-3 shadow-sm hover:shadow-md transition bg-white">
            {/* Bestseller Badge */}
            <div className="absolute top-2 left-2 bg-red-500 text-white text-[11px] px-2 py-[2px] rounded-full uppercase z-10">
              Hot
            </div>

            {/* Wishlist */}
            <button className="absolute top-2 right-2 text-gray-500 hover:text-primary z-10">
              <FaHeart />
            </button>

            {/* Image */}
            <Link href={`/products/${product.slug}`} className="block">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-60 object-cover rounded"
              />
            </Link>

            {/* Info */}
            <div className="mt-4">
              <h3 className="text-sm font-medium text-gray-900 group-hover:text-primary">
                {product.name}
              </h3>
              <p className="text-sm text-gray-500 mt-1">{product.price}</p>
              <div className="text-xs text-yellow-500 mt-1 flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <FaStar
                    key={i}
                    className={i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'}
                  />
                ))}
                <span className="text-gray-400 ml-1">({product.rating})</span>
              </div>
              <button className="mt-2 w-full bg-red-500 text-white text-sm py-1 rounded hover:bg-pink-600">
                Add to Bag
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
