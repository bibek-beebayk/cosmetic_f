'use client'

import { FaHeart } from 'react-icons/fa'

const newArrivals = [
  {
    id: 1,
    name: 'Glow Boost Serum',
    image: '/products/product1.jpg',
    price: '$39.00',
    rating: 4.5,
  },
  {
    id: 2,
    name: 'Nude Lipstick Set',
    image: '/products/product1.jpg',
    price: '$24.00',
    rating: 4.2,
  },
  {
    id: 3,
    name: 'Hydrating Moisturizer',
    image: '/products/product1.jpg',
    price: '$42.00',
    rating: 4.8,
  },
  {
    id: 4,
    name: 'Lash Lift Mascara',
    image: '/products/product1.jpg',
    price: '$29.00',
    rating: 4.6,
  },
]

export default function NewArrivals() {
  return (
    <section className="py-10 px-4 max-w-7xl mx-auto bg-violet-100">
      <h2 className="text-2xl font-semibold mb-6 text-center">New Arrivals</h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {newArrivals.map((product) => (
          <div key={product.id} className="group border rounded-md p-3 shadow-sm hover:shadow-md transition">
            <div className="relative">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-60 object-cover rounded"
              />
              <button className="absolute top-2 right-2 text-gray-500 hover:text-primary">
                <FaHeart />
              </button>
            </div>

            <div className="mt-4">
              <h3 className="text-sm font-medium text-gray-900 group-hover:text-primary">
                {product.name}
              </h3>
              <p className="text-sm text-gray-500 mt-1">{product.price}</p>
              <div className="text-xs text-yellow-500 mt-1">
                {'★'.repeat(Math.floor(product.rating))}
                {'☆'.repeat(5 - Math.floor(product.rating))}
                <span className="text-gray-400 ml-1">({product.rating})</span>
              </div>
              <button className="mt-2 w-full bg-primary text-white text-sm py-1 rounded hover:bg-pink-600">
                Add to Bag
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
