'use client'

import { FaTrash } from 'react-icons/fa'

const wishlistItems = [
  {
    id: 1,
    name: 'LANEIGE Lip Glowy Balm',
    price: 28.0,
    image: '/products/product1.jpg',
  },
  {
    id: 2,
    name: 'Rare Beauty Soft Pinch Blush',
    price: 45.0,
    image: '/products/product1.jpg',
  },
]

export default function WishlistPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-semibold mb-6">My Wishlist</h1>

      {wishlistItems.length === 0 ? (
        <p>Your wishlist is empty.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {wishlistItems.map((item) => (
            <div key={item.id} className="border rounded p-4 shadow-sm hover:shadow-md transition">
              <div className="relative">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-60 object-cover rounded"
                />
                <button className="absolute top-2 right-2 text-gray-400 hover:text-red-500">
                  <FaTrash />
                </button>
              </div>
              <div className="mt-4">
                <h3 className="text-sm font-semibold text-gray-800 mb-1">{item.name}</h3>
                <p className="text-sm text-gray-500 mb-3">${item.price.toFixed(2)}</p>
                <button className="w-full bg-red-500 text-white py-2 rounded hover:bg-pink-600 text-sm font-medium">
                  Move to Bag
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
