'use client'

import Link from 'next/link'
import { FaTrash, FaChevronLeft } from 'react-icons/fa'
import { useEffect, useState } from 'react'
import { apiCall } from '@/lib/axios'
import { ProductList } from '@/types/core'
import { removeFromCart, updateCartQuantity } from '@/lib/api/product'
import toast from 'react-hot-toast'
import LoadingSpinner from '@/components/LoadingSpinner'

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

type CartItem = {
  id: number
  product: ProductList
  quantity: number
  selected_variant: string | null
  selected_shade: string | null
  price: number
  product_image: string
}

export default function CartPage() {

  const [items, setItems] = useState<CartItem[]>()
  const [subtotal, setSubtotal] = useState(0)
  const [gst, setGst] = useState(0)
  const [total, setTotal] = useState(0)

  useEffect(() => {
    if (items && items.length > 0) {
      const sub = items.reduce((acc, item) => acc + item.price * item.quantity, 0)
      const g = sub * 0.1
      const t = sub + g
      setSubtotal(sub)
      setGst(g)
      setTotal(t)
    }
  }, [items])

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await apiCall<CartItem[]>('get', '/cart/')
        // const data = await response.json()
        setItems(response)
        console.log(response)
      }
      catch (error) {
        console.error('Error fetching cart items:', error)
      }
    }
    fetchCartItems()
  }, []) // Empty dependency array to run only on component mount and unmon))


  if (!items){
    return <LoadingSpinner />
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-semibold mb-6">Shopping Cart</h1>

      {/* Cart Layout */}
      <div className="grid md:grid-cols-3 gap-6">
        {/* Cart Items */}
        <div className="md:col-span-2">
          {cartItems.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            <div className="space-y-4">
              {items?.map((item) => (
                <div key={item.id} className="flex flex-col sm:flex-row items-start sm:items-center justify-between border p-4 rounded">
                  <div className="flex items-center gap-4 w-full sm:w-auto">
                    <img src={item?.product_image} alt={item?.product?.name} className="h-24 object-cover rounded" />
                    <div>
                      <h3 className="text-sm font-semibold text-gray-800">{item?.product?.name}</h3>
                      {item?.selected_variant && <p className="text-xs text-gray-500">{item.selected_variant}</p>}
                      {item?.selected_shade && <p className="text-xs text-gray-500">{item.selected_shade}</p>}
                      
                      <p className="text-sm mt-1 font-medium">${item?.price}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 mt-4 sm:mt-0">
                    <select
                      className="border rounded px-2 py-1 text-sm"
                      value={item.quantity}
                      onChange={async (e) => {
                        const newQty = parseInt(e.target.value)
                        if (newQty !== item.quantity) {
                          try {
                            await updateCartQuantity(item.id, newQty)
                            // Update local state
                            setItems(prev =>
                              prev?.map(ci =>
                                ci.id === item.id ? { ...ci, quantity: newQty } : ci
                              )
                            )
                            toast.success('Quantity updated!')
                          } catch (err) {
                            console.error('Failed to update quantity:', err)
                          }
                        }
                      }}
                    >
                      {[1, 2, 3, 4, 5].map((q) => (
                        <option key={q} value={q}>{q}</option>
                      ))}
                    </select>

                    <button className="text-gray-400 hover:text-red-500">
                      <FaTrash 
                        onClick={async () => {
                          try {
                            await removeFromCart(item.id)
                            // Update local state
                            setItems(prev => prev?.filter(ci => ci.id !== item.id))
                            toast.success('Item removed from cart!')
                          } catch (err) {
                            console.error('Failed to remove item:', err)
                          }
                        }}
                      />
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
              <span>${subtotal}</span>
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
