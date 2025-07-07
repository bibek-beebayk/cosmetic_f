'use client'

import { toggleWishlist } from '@/lib/api/product'
import { apiCall } from '@/lib/axios'
import { ProductList } from '@/types/core'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { FaTrash } from 'react-icons/fa'

export default function WishlistPage() {

  const [wishList, setWishList] = useState<ProductList[]>()
  const [toggle, setToggle] = useState(false)

  useEffect(() => {
    // const storedWishList = localStorage.getItem('wishlist')
    // if (storedWishList) {
    //   setWishList(JSON.parse(storedWishList))
    // }
    const fetchWishList = async () => {
      const response = await apiCall<ProductList[]>("get", '/wishlist')
      // console.log(response)
      setWishList(response)
    }
    fetchWishList()
  }, [toggle])

  const handleDelete = async (id: number) => {
    try {
      const res = await toggleWishlist(id)
      toast.success(res.message)
      setToggle((prev) => !prev)
      // Optionally update local product state here
    } catch (err) {
      console.error('Wishlist toggle failed', err)
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-semibold mb-6">My Wishlist</h1>

      {wishList?.length === 0 ? (
        <h3>Your wishlist is empty.</h3>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {wishList?.map((item) => (
            <div key={item.id} className="border rounded p-4 shadow-sm hover:shadow-md transition">
              <div className="relative">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-60 object-cover rounded"
                />
                <button className="absolute top-2 right-2 text-gray-400 hover:text-red-500" onClick={() => handleDelete(item.id)}>
                  <FaTrash />
                </button>
              </div>
              <div className="mt-4">
                <h3 className="text-sm font-semibold text-gray-800 mb-1">{item.name}</h3>
                <p className="text-sm text-gray-500 mb-3">${item.price}</p>
                <button className="w-full bg-red-500 text-white py-2 rounded hover:bg-pink-600 text-sm font-medium">
                  Move to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
