'use client'

import LoadingSpinner from '@/components/LoadingSpinner'
import { removeFromCart, updateCartQuantity } from '@/lib/api/product'
import { apiCall } from '@/lib/axios'
import { ProductList } from '@/types/core'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
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

export default function CartContent() {
  const [items, setItems] = useState<CartItem[]>()
  const [subtotal, setSubtotal] = useState(0)
  const [gst, setGst] = useState(0)
  const [total, setTotal] = useState(0)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const router = useRouter()

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
        setItems(response)
        console.log(response)
      }
      catch (error) {
        console.error('Error fetching cart items:', error)
      }
    }
    fetchCartItems()
  }, [])

  if (!items) {
    return <LoadingSpinner />
  }

  const handleCheckout = async () => {
    try {
      const res = await apiCall("post", "/checkout/")
      console.log("Response Data: ", res)
      toast.success("Order placed.")
      setIsModalOpen(false)
      router.refresh()
    }
    catch (error) {
      console.error(error)
      toast.error("Error during checkout.")
    }
  }

  return (
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
                    <p className="font-medium">{"GST"}</p>
                  </div>
                  <p>${(gst)}</p>
                </div>
                <hr />
                <div className="flex justify-between font-semibold pt-2">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
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
  )
}