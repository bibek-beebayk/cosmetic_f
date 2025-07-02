'use client'

import { ProductList } from '@/types/core'
import Link from 'next/link'
import { FaHeart, FaRegStar, FaStar, FaStarHalfAlt } from 'react-icons/fa'


type ProductCardProps = {
    product: ProductList
    showWishlist?: boolean
    showAddToCart?: boolean
    onAddToCart?: () => void
    onWishlistToggle?: () => void
}

export default function ProductCard({
  product,
  showWishlist = true,
  showAddToCart = true,
  onAddToCart,
  onWishlistToggle,
}: ProductCardProps) {
  return (
    <div className="relative border border-red-100 rounded-md p-4 shadow-md hover:shadow-lg transition bg-white group flex flex-col justify-between h-full">
      {/* Wishlist Icon */}
      {showWishlist && (
        <button
          onClick={onWishlistToggle}
          className="absolute top-3 right-3 text-gray-400 hover:text-red-500 text-lg z-10"
        >
          <FaHeart />
        </button>
      )}

      {/* Top content */}
      <div>
        <Link href={`/products/${product.slug}`} className="block mb-3">
          <img
            src={product.image}
            alt={product.name}
            className="object-contain mb-3 transition-transform duration-200 group-hover:scale-105 rounded-md h-20 md:h-36 w-full"
          />
        </Link>

        <h4 className="text-xs text-gray-500 uppercase font-semibold">{product.brand}</h4>
        <p className="text-sm md:font-medium text-gray-800">{product.name}</p>
        <p className="text-sm font-bold text-gray-900">${product.price}</p>

        <div className="flex items-center gap-1 text-sm text-gray-600 mb-4">
          {Array.from({ length: 5 }, (_, index) => {
            const rating = product.rating || 0
            if (index + 1 <= Math.floor(rating)) {
              return <FaStar key={index} className="text-yellow-500" />
            } else if (index < rating) {
              return <FaStarHalfAlt key={index} className="text-yellow-500" />
            } else {
              return <FaRegStar key={index} className="text-yellow-300" />
            }
          })}
          <span className="ml-2 text-gray-700 font-medium">{product.rating?.toFixed(1)}</span>
        </div>
      </div>

      {/* Add to Cart Button */}
      {showAddToCart && (
        <button
          onClick={onAddToCart}
          className="mt-auto w-full bg-red-500 hover:bg-pink-600 text-white text-sm font-semibold py-1 rounded"
        >
          Add to Cart
        </button>
      )}
    </div>
  )
}
