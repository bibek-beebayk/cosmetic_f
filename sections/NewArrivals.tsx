'use client'

import ProductCard from '@/components/ProductCard'
import { ProductList } from '@/types/core'

// const newArrivals = [
//   {
//     id: 1,
//     name: 'Glow Boost Serum',
//     brand: 'Glow Cosmetics',
//     slug: 'glow-boost-serum',
//     image: '/products/product2.jpg',
//     price: 39.00,
//     rating: 4.5,
//   },
//   {
//     id: 2,
//     name: 'Nude Lipstick Set',
//     brand: 'Lip Luxe',
//     slug: 'nude-lipstick-set',
//     image: '/products/product1.jpg',
//     price: 24.00,
//     rating: 4.2,
//   },
//   {
//     id: 3,
//     name: 'Hydrating Moisturizer',
//     brand: 'HydraGlow',
//     slug: 'hydrating-moisturizer',
//     image: '/products/product1.jpg',
//     price: 42.00,
//     rating: 4.8,
//   },
//   {
//     id: 4,
//     name: 'Lash Lift Mascara',
//     brand: 'Lash & Brow',
//     slug: 'lash-lift-mascara',
//     image: '/products/product1.jpg',
//     price: 29.00,
//     rating: 4.6,
//   },
// ]

type Props = {
  newArrivals?: ProductList[]
}


export default function NewArrivals({newArrivals = []}: Props ) {
  return (
    <section className="py-10 px-4 max-w-7xl mx-auto">
      <h2 className="text-2xl font-semibold mb-6 text-center">New Arrivals</h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {newArrivals.map((product) => (
          <ProductCard key={product.slug} product={product} showAddToCart={true} showWishlist={true} />
        ))}
      </div>
    </section>
  )
}
