'use client'

import LoadingSpinner from '@/components/LoadingSpinner'
import { removeFromCart, updateCartQuantity } from '@/lib/api/product'
import { apiCall } from '@/lib/axios'
import { ProductList } from '@/types/core'
import Link from 'next/link'
import { Suspense, useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { FaChevronLeft, FaTrash } from 'react-icons/fa'


type CartItem = {
  id: number
  product: ProductList
  quantity: number
  selected_variant: string | null
  selected_shade: string | null
  price: number
  product_image: string
}

type NumberData = {
  subtotal: number,
  total: number,
  gst_rate: number,
  gst_amount: number,
  total_items: number
}

export default function CartPage() {

  const [items, setItems] = useState<CartItem[] | []>()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [refetch, setRefetch] = useState(false)
  const [numbers, setNumbers] = useState<NumberData>({
    subtotal: 0,
    total: 0,
    gst_rate: 0.1,
    gst_amount: 0,
    total_items: 0
  })

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await apiCall<CartItem[]>('get', '/cart/')
        setItems(response)

        const numbers = await apiCall<NumberData>('get', '/cart/get-numbers/')
        console.log("Numbers: ", numbers)
        setNumbers(numbers)
      }
      catch (error) {
        console.error('Error fetching cart items:', error)
      }
    }
    fetchCartItems()
  }, [refetch])


  if (!items) {
    return <LoadingSpinner />
  }

  const handleCheckout = async () => {
    try {
      await apiCall("post", "/checkout/")
      setIsModalOpen(false)
      setRefetch(!refetch)
      toast.success("Order placed.")
    }
    catch (error) {
      console.error(error)
      toast.error("Error during checkout.")
    }
  }

  return (
    <Suspense fallback={<div>Loading login...</div>}>
      <div className="max-w-7xl mx-auto px-4 py-10">
        <h1 className="text-2xl font-semibold mb-6">Shopping Cart</h1>

        {/* Cart Layout */}
        <div className="grid md:grid-cols-3 gap-6">
          {/* Cart Items */}
          <div className="md:col-span-2">
            {items.length === 0 ? (
              <div className='flex flex-col gap-2'>
                <p>Your cart looks empty. Browse our catalogue to add items you like. </p>
                <Link href={"/products/?category=all"} className='w-28 p-2 rounded text-xs bg-red-500 cursor-pointer text-center text-white hover:bg-pink-500'>Show All Items</Link>
              </div>
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
                              setRefetch(!refetch)
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
                              toast.success('Item removed from cart!')
                              setRefetch(!refetch)
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

            {/* <div className="mb-4">
            <label className="text-sm block mb-1">Promo Code</label>
            <div className="flex">
              <input type="text" placeholder="Enter code" className="flex-1 border px-3 py-2 rounded-l text-sm" />
              <button className="bg-gray-800 text-white px-4 py-2 text-sm rounded-r hover:bg-black">Apply</button>
            </div>
          </div> */}

            <div className="text-sm space-y-2">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${numbers.subtotal}</span>
              </div>
              <div className="flex justify-between">
                <span>GST {`(${(numbers.gst_rate * 100)}%)`}</span>
                <span>${numbers.gst_amount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-semibold text-base pt-2 border-t">
                <span>Total</span>
                <span>${numbers.total}</span>
              </div>
            </div>

            <button className="mt-6 w-full bg-red-500 text-white py-2 rounded hover:bg-pink-600 text-sm font-semibold" onClick={() => setIsModalOpen(true)}>
              Secure Checkout
            </button>

            <Link href={"/"} className="mt-2 w-full text-sm text-gray-600 hover:text-black flex items-center justify-center gap-1">
              <FaChevronLeft /> Continue Shopping
            </Link>
          </div>
        </div>

        {isModalOpen && (
          <div className="transition-opacity duration-300 ease-in-out">
            <div className="fixed inset-0 z-50 bg-black bg-opacity-10 flex justify-center items-center px-4 ">
              <div className="bg-white w-full max-w-md rounded shadow-lg p-6 relative">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="absolute top-3 right-3 text-gray-500 hover:text-red-500 text-lg"
                >
                  ×
                </button>
                <h2 className="text-lg font-semibold mb-4">Confirm Your Order</h2>

                <div className="text-sm space-y-2">
                  {items?.map((item) => (
                    <div key={item.id} className="flex justify-between border-b py-1">
                      <img src={item.product_image} alt={item.product.name} className='h-8 w-8 object-cover' />
                      <div>
                        <p className="font-medium">{item.product.name}</p>
                        <p className="font-medium text-xs">{item.selected_variant && `Variant: ${item.selected_variant}`} {item.selected_shade && `Shade: ${item.selected_shade}`}</p>
                        <p className="text-gray-500 text-xs">Qty: {item.quantity}</p>
                      </div>
                      <p>${(item.product.price * item.quantity).toFixed(2)}</p>
                    </div>
                  ))}
                  <hr />
                  <div className="flex justify-between border-b py-1">
                    <div>
                      <p className="font-medium">{`GST (${numbers.gst_rate * 100}%)`}</p>
                      {/* <p className="text-gray-500 text-xs">Qty: {}</p> */}
                    </div>
                    <p>${(numbers.gst_amount.toFixed(2))}</p>
                  </div>
                  <hr />
                  <div className="flex justify-between font-semibold pt-2">
                    <span>Total</span>
                    <span>${numbers.total.toFixed(2)}</span>
                  </div>
                </div>

                <button
                  onClick={handleCheckout}
                  className="mt-6 w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 text-sm font-semibold"
                >
                  Place Order
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </ Suspense>
  )
}
