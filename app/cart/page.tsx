'use client'

import Link from 'next/link'
import { FaTrash, FaChevronLeft } from 'react-icons/fa'

const cartItems = [
  {
    id: 1,
    name: 'LANEIGE Glowy Balm',
    variant: 'Blueberry Tint',
    price: 30.0,
    image: '/products/product1.jpg',
    quantity: 1,
  },
]

export default function CartPage() {
  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)
  const gst = subtotal * 0.1
  const total = subtotal + gst

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-semibold mb-6">Shopping Bag</h1>

      {/* Cart Layout */}
      <div className="grid md:grid-cols-3 gap-6">
        {/* Cart Items */}
        <div className="md:col-span-2">
          {cartItems.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div key={item.id} className="flex flex-col sm:flex-row items-start sm:items-center justify-between border p-4 rounded">
                  <div className="flex items-center gap-4 w-full sm:w-auto">
                    <img src={item.image} alt={item.name} className="w-24 h-24 object-cover rounded" />
                    <div>
                      <h3 className="text-sm font-semibold text-gray-800">{item.name}</h3>
                      <p className="text-xs text-gray-500">{item.variant}</p>
                      <p className="text-sm mt-1 font-medium">${item.price.toFixed(2)}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 mt-4 sm:mt-0">
                    <select className="border rounded px-2 py-1 text-sm">
                      {[1, 2, 3, 4, 5].map((q) => (
                        <option key={q} value={q}>{q}</option>
                      ))}
                    </select>
                    <button className="text-gray-400 hover:text-red-500">
                      <FaTrash />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Summary */}
        <div className="border p-6 rounded shadow-sm">
          <h2 className="text-lg font-semibold mb-4">Order Summary</h2>

          <div className="mb-4">
            <label className="text-sm block mb-1">Promo Code</label>
            <div className="flex">
              <input type="text" placeholder="Enter code" className="flex-1 border px-3 py-2 rounded-l text-sm" />
              <button className="bg-gray-800 text-white px-4 py-2 text-sm rounded-r hover:bg-black">Apply</button>
            </div>
          </div>

          <div className="text-sm space-y-2">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>GST</span>
              <span>${gst.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-semibold text-base pt-2 border-t">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>

          <button className="mt-6 w-full bg-red-500 text-white py-2 rounded hover:bg-pink-600 text-sm font-semibold">
            Secure Checkout
          </button>

          <Link href={"/"} className="mt-2 w-full text-sm text-gray-600 hover:text-black flex items-center justify-center gap-1">
            <FaChevronLeft /> Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  )
}
