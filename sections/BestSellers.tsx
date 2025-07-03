'use client'

import { useState, useEffect } from 'react'
import ProductCard from '@/components/ProductCard'
import { ProductList } from '@/types/core'
import { addToCart, toggleWishlist } from '@/lib/api/product'
import toast from 'react-hot-toast'

type Props = {
  bestSellers?: ProductList[]
}

export default function BestSellers({ bestSellers = [] }: Props) {
  const [products, setProducts] = useState<ProductList[]>(bestSellers)

  // Sync with server data when prop changes
  useEffect(() => {
    setProducts(bestSellers)
  }, [bestSellers])

  const handleWishlistToggle = async (productId: number) => {
    try {
      const res = await toggleWishlist(productId)
      toast.success(res.message)

      setProducts((prev) =>
        prev.map((p) =>
          p.id === productId ? { ...p, is_in_wishlist: !p.is_in_wishlist } : p
        )
      )
    } catch (err) {
      console.error('Wishlist toggle failed', err)
      toast.error('An error occurred.')
    }
  }

  const handleAddToCart = async (productId: number) => {
    try {
      await addToCart(productId)
      toast.success('Added to cart!')
    } catch (err) {
      console.error('Add to cart failed', err)
      toast.error('Failed to add to cart.')
    }
  }

  return (
    <section className="py-10 px-4 max-w-7xl mx-auto">
      <h2 className="text-2xl font-semibold mb-6 text-center">Best Sellers</h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard
            key={product.slug}
            product={product}
            showAddToCart
            showWishlist
            onWishlistToggle={() => handleWishlistToggle(product.id)}
            onAddToCart={() => handleAddToCart(product.id)}
          />
        ))}
      </div>
    </section>
  )
}
