'use client'

import LoadingSpinner from '@/components/LoadingSpinner'
import { useAuth } from '@/context/AuthContext'
import { addToCart, toggleWishlist } from '@/lib/api/product'
import { apiCall } from '@/lib/axios'
import { BasicResponse } from '@/types/core'
import { ProductData } from '@/types/product'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { FaHeart, FaRegStar, FaStar, FaStarHalfAlt } from 'react-icons/fa'

export default function ProductDetailsPage() {
  const { slug } = useParams()
  const [productData, setProductData] = useState<ProductData>()
  const [quantity, setQuantity] = useState(1)
  const [mainImage, setMainImage] = useState<string>()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalIndex, setModalIndex] = useState(0)
  const [wishListToggled, setWishListToggled] = useState(false)
  const [selectedVariantId, setSelectedVariantId] = useState<number | null>(null)
  const [selectedShadeId, setSelectedShadeId] = useState<number | null>(null)
  const [availableQuantity, setAvailableQuantity] = useState<number>(0)
  const [userRating, setUserRating] = useState<number>(0)
  const [userComment, setUserComment] = useState<string>("")
  const router = useRouter()
  const { isAuthenticated } = useAuth()
  const [refetch, setRefetch] = useState(false);

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const data = await apiCall<ProductData>('get', `/product/${slug}/`)
        setProductData(data)
        setMainImage(data?.images?.[0]?.image)

        if (data.variants.length > 0) {
          setSelectedVariantId(data.variants[0].id)
        }

        if (data.shades.length > 0) {
          setSelectedShadeId(data.shades[0].id)
        }
      } catch (error) {
        console.error('Error fetching product data:', error)
      }
    }

    fetchProductData()
  }, [slug, wishListToggled, refetch])


  const selectedVariant = productData?.variants.find(v => v.id === selectedVariantId)
  const selectedShade = productData?.shades.find(s => s.id === selectedShadeId)


  useEffect(() => {
    console.log("Selected Variant: ", selectedVariant)
    console.log("Selected Shade: ", selectedShade)
    console.log("Selected Quantity: ", quantity)
    console.log("Available Quantity: ", availableQuantity)
    if (selectedShade) setAvailableQuantity(selectedShade.stock)
    if (selectedVariant) setAvailableQuantity(selectedVariant.stock)
  }, [selectedVariant, selectedShade, quantity])

  if (!productData) return <LoadingSpinner />

  const images = productData.images.map((img) => img.image)

  const handlePrev = () => {
    const newIndex = modalIndex === 0 ? images.length - 1 : modalIndex - 1
    setModalIndex(newIndex)
    setMainImage(images[newIndex])
  }

  const handleNext = () => {
    const newIndex = modalIndex === images.length - 1 ? 0 : modalIndex + 1
    setModalIndex(newIndex)
    setMainImage(images[newIndex])
  }

  const handleAddToCart = async () => {
    console.log("Is Authenticated Cat: ", isAuthenticated)
    if (!isAuthenticated) router.push("/login");

    try {
      console.log("Add To Cart Button clicked")
      const response = await addToCart(productData.id, quantity, selectedShade?.id, selectedVariant?.id)
      console.log("Response: ", response)
      toast.success("Added to cart")

    } catch (error) {
      console.error(error)
    }
  }

  const handleReviewSubmit = async () => {
    console.log("Review Submit clicked.")

    try {
      const res = await apiCall<BasicResponse>("post", `/product/${slug}/review/`, {
        rating: userRating,
        comment: userComment
      })
      toast.success(res.message)
      setUserComment("")
      setUserRating(0)
      setRefetch(!refetch)
    } catch (e) {
      console.error(e)
    }

  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="grid md:grid-cols-2 gap-8 justify-end">
        {/* Product Images */}
        <div className='flex flex-col justify-start items-center'>
          <img
            src={mainImage}
            alt={productData.name}
            onClick={() => {
              setIsModalOpen(true)
              setModalIndex(images.indexOf(mainImage!))
            }}
            className=" h-96 object-cover rounded transition-transform duration-300 hover:scale-110 cursor-zoom-in"
          />

          <div className="flex gap-2 mt-4 overflow-auto justify-center">
            {images.map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt={`Thumbnail ${idx + 1}`}
                onClick={() => {
                  setMainImage(img)
                  setModalIndex(idx)
                }}
                className={`w-16 h-16 object-cover rounded cursor-pointer border ${img === mainImage ? 'border-black' : 'border-gray-300'}`}
              />
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div>
          <h2 className="text-sm text-gray-500 uppercase mb-1">{productData.brand.name}</h2>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">{productData.name}</h1>

          {/* Rating */}
          <div className="flex items-center gap-1 text-sm text-gray-600 mb-4">
            {Array.from({ length: 5 }, (_, index) => {
              const rating = productData.rating || 0
              if (index + 1 <= Math.floor(rating)) {
                return <FaStar key={index} className="text-yellow-500" />
              } else if (index < rating) {
                return <FaStarHalfAlt key={index} className="text-yellow-500" />
              } else {
                return <FaRegStar key={index} className="text-yellow-300" />
              }
            })}
            <span className="ml-2 text-gray-700 font-medium">{productData.rating}</span>
            <span>{`( ${productData.reviews.length} Reviews )`}</span>
          </div>

          {/* Price */}
          <p className="text-xl font-semibold text-gray-900 mb-4">
            {selectedVariant ? `$${selectedVariant.price}` : `$${productData.price}`}
          </p>

          {/* Variant Swatches (Shades) */}
          {productData.shades.length > 0 && <h3 className="text-sm mb-2">
            Shade: <span className="text-red-500">{selectedShade?.name}</span>
          </h3>}
          {productData.shades.map((shade) => (
            <button
              key={shade.id}
              title={shade.name}
              onClick={() => setSelectedShadeId(shade.id)}
              className={`w-8 h-8 mr-1 rounded-full border-2 cursor-pointer ${selectedShadeId === shade.id ? 'border-black scale-110' : 'border-gray-300'}`}
              style={{ backgroundColor: shade.hex_code }}
            />
          ))}


          {/* Variant Swatches (Variations) */}
          {productData.variants.length > 0 && <h3 className="text-sm mb-2">
            Variant: <span className="text-red-500">{selectedVariant?.name}</span>
          </h3>}
          {productData.variants.map((variant) => (
            <span
              key={variant.id}
              className={`p-2 rounded border-2 cursor-pointer ${selectedVariantId === variant.id ? 'border-red-500 scale-110 bg-amber-100' : 'border-gray-300'} mr-2`}
              onClick={() => setSelectedVariantId(variant.id)}
            >
              {variant.name}
            </span>
          ))}

          {/* Quantity */}
          <div className="mb-4 mt-4">
            <label className="text-sm block mb-1">Qty</label>
            <select
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value))}
              className="border rounded px-2 py-1 text-sm"
            >
              {[1, 2, 3, 4, 5].map((q) => (
                <option key={q} value={q}>{q}</option>
              ))}
            </select>
          </div>

          <div className="flex gap-3">
            <button className="bg-red-500 text-white px-6 py-2 rounded hover:bg-pink-600 text-sm font-semibold" onClick={handleAddToCart}>
              Add to Cart
            </button>
            <button className={`text-gray-500 hover:text-red-200 text-xl ${productData.is_in_wishlist ? 'text-red-500' : 'text-gray-400'}`} onClick={async () => {
              try {
                const res = await toggleWishlist(productData.id)
                console.log("Res: ", res)
                toast.success(res.message)
                setWishListToggled((prev) => !prev)
                // Optionally update local product state here
              } catch (err) {
                console.error('Wishlist toggle failed', err)
                toast.error("An error occured.")
              }
            }}>
              <FaHeart />
            </button>
          </div>

          {/* Description */}
          <div className="mt-8">
            <h3 className="text-sm font-semibold mb-2 uppercase">Description</h3>
            <div
              className="text-sm text-gray-700 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: productData.description }}
            />
          </div>

          {/* Ingredients */}
          {productData.ingredients && (
            <div className="mt-6">
              <h3 className="text-sm font-semibold mb-2 uppercase">Ingredients</h3>
              <div
                className="text-sm text-gray-700 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: productData.ingredients }}
              />
            </div>
          )}

          {/* How to Use */}
          {productData.how_to_use && (
            <div className="mt-6">
              <h3 className="text-sm font-semibold mb-2 uppercase">How to Use</h3>
              <div
                className="text-sm text-gray-700 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: productData.how_to_use }}
              />
            </div>
          )}

        </div>
      </div>

      {/* Lightbox Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex flex-col items-center justify-center z-50">
          <button
            className="absolute top-4 right-6 text-white text-3xl font-bold"
            onClick={() => setIsModalOpen(false)}
          >
            ×
          </button>

          <div className="flex w-full max-w-xl px-4 justify-center mx-10">
            <button
              onClick={handlePrev}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 text-white text-3xl px-4 py-2 h-1/2"
            >
              ‹
            </button>
            <img
              src={images[modalIndex]}
              alt="Zoomed"
              className="w-full h-auto object-contain rounded transition duration-300 ease-in-out"
            />
            <button
              onClick={handleNext}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 text-white text-3xl px-4 py-2 h-1/2"
            >
              ›
            </button>
          </div>

          <div className="mt-4 flex gap-2 px-4">
            {images.map((img, i) => (
              <img
                key={i}
                src={img}
                alt={`Modal thumb ${i + 1}`}
                onClick={() => {
                  setModalIndex(i)
                  setMainImage(img)
                }}
                className={`h-16 object-cover rounded cursor-pointer border transition duration-200 ${i === modalIndex ? 'border-white scale-105' : 'border-gray-500'}`}
              />
            ))}
          </div>
        </div>
      )}

      <div className="mt-10">
        <h3 className="text-lg font-semibold mb-2 uppercase">Customer Reviews</h3>

        {isAuthenticated ?
          <div className="mt-6 border-t pt-4 mb-6">
            <h4 className="text-md font-medium">Write a Review</h4>
            {productData.has_user_reviewed && <i className='text-xs mb-4 text-yellow-600'>Your existing review will be updated.</i>}
            <div className="flex gap-1 text-yellow-500 mb-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <button key={i} onClick={() => setUserRating(i + 1)}>
                  {i < userRating ? <FaStar /> : <FaRegStar className="text-gray-300" />}
                </button>
              ))}
            </div>
            <textarea
              value={userComment}
              onChange={(e) => setUserComment(e.target.value)}
              className="w-full border rounded px-3 py-2 text-sm mb-2"
              rows={3}
              placeholder="Share your thoughts..."
            />
            <button
              className="bg-red-500 text-white px-4 py-2 rounded text-sm hover:bg-pink-600"
              onClick={handleReviewSubmit}
            >
              Submit Review
            </button>
          </div> : <Link href={"/login"} className='text-xs'><i>Log in to add a review.</i> </Link>

        }
        {/* <hr /> */}

        {productData?.reviews.length === 0 ? (
          <p className="text-sm text-gray-600">No reviews yet.</p>
        ) : (
          <div className="space-y-4 bg-gray-100 p-2">
            {productData.reviews.map((rev) => (
              <div key={rev.id} className="pb-2">
                <div className="flex items-center gap-2 text-yellow-500">
                  {Array.from({ length: 5 }).map((_, i) =>
                    i < rev.rating ? <FaStar key={i} /> : <FaRegStar key={i} className="text-gray-300" />
                  )}
                  <span className="text-sm text-gray-700 ml-2">{rev.user.email}</span>
                </div>
                <p className="text-sm text-gray-700 mt-1">{rev.comment}</p>
                <p className="text-xs text-gray-500">{new Date(rev.created_at).toLocaleDateString()}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
