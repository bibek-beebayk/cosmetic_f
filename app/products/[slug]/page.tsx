'use client'

import { apiCall } from '@/lib/axios'
import { ProductData } from '@/types/product'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { FaHeart, FaRegStar, FaStar, FaStarHalfAlt } from 'react-icons/fa'

export default function ProductDetailsPage() {
  const { slug } = useParams()
  const [productData, setProductData] = useState<ProductData>()
  const [selectedVariant, setSelectedVariant] = useState<number>(0)
  const [quantity, setQuantity] = useState(1)
  const [mainImage, setMainImage] = useState<string>()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalIndex, setModalIndex] = useState(0)

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const data = await apiCall<ProductData>('get', `/product/${slug}/`)
        setProductData(data)
        setMainImage(data?.images?.[0]?.image)
      } catch (error) {
        console.error('Error fetching product data:', error)
      }
    }

    fetchProductData()
  }, [slug])

  if (!productData) return <div className="py-10 px-4">Loading...</div>

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

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="grid md:grid-cols-2 gap-8">
        {/* Product Images */}
        <div>
          <img
            src={mainImage}
            alt={productData.name}
            onClick={() => {
              setIsModalOpen(true)
              setModalIndex(images.indexOf(mainImage!))
            }}
            className="w-full h-auto object-cover rounded transition-transform duration-300 hover:scale-110 cursor-zoom-in"
          />

          <div className="flex gap-2 mt-4 overflow-auto">
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
            <span className="ml-2 text-gray-700 font-medium">{productData.rating?.toFixed(1)}</span>
          </div>

          {/* Price */}
          <p className="text-xl font-semibold text-gray-900 mb-4">
            {productData.variants.length > 0
              ? `$${productData.variants[selectedVariant].price}`
              : productData.shades.length > 0 && productData.variants.length > selectedVariant
                ? `$${productData.variants[selectedVariant].price}`
                : `$${productData.price}`
            }
          </p>

          {/* Variant Swatches (Shades) */}
          {productData.shades.length > 0 && (
            <div className="mb-4">
              <h3 className="text-sm  mb-2">Shade: <span className='text-red-500'>{productData.shades[selectedVariant].name}</span></h3>
              <div className="flex gap-2">
                {productData.shades.map((shade, i) => (
                  <button
                    key={shade.name}
                    title={shade.name}
                    onClick={() => setSelectedVariant(i)}
                    className={`w-8 h-8 rounded-full border-2 cursor-pointer ${selectedVariant === i ? 'border-black scale-110' : 'border-gray-300'
                      }`}
                    style={{ backgroundColor: shade.hex_code }}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Variant Swatches (Variations) */}
          {productData.variants.length > 0 && (
            <div className="mb-4">
              <h3 className="text-sm font-semibold mb-2">Variants</h3>
              <div className="flex gap-2">
                {productData.variants.map((variant, i) => (
                  // <img
                  //   key={variant.name}
                  //   src={variant.image}
                  //   alt={variant.name}
                  //   onClick={() => setSelectedVariant(i)}
                  //   className={`w-6 h-6 rounded-full border-2 cursor-pointer ${selectedVariant === i ? 'border-black scale-110' : 'border-gray-300'}`}
                  // />
                  <div
                    key={variant.name}
                    className={`p-2 rounded border-2 cursor-pointer ${selectedVariant === i ? 'border-red-500 scale-110 bg-amber-100' : 'border-gray-300'}`}
                    onClick={() => setSelectedVariant(i)}
                  >
                    {variant.name}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Quantity */}
          <div className="mb-4">
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
            <button className="bg-red-500 text-white px-6 py-2 rounded hover:bg-pink-600 text-sm font-semibold">
              Add to Bag
            </button>
            <button className="text-gray-500 hover:text-red-500 text-xl">
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

          <div className="mt-4 flex gap-2 overflow-x-auto px-4">
            {images.map((img, i) => (
              <img
                key={i}
                src={img}
                alt={`Modal thumb ${i + 1}`}
                onClick={() => {
                  setModalIndex(i)
                  setMainImage(img)
                }}
                className={`w-16 h-16 object-cover rounded cursor-pointer border transition duration-200 ${i === modalIndex ? 'border-white scale-105' : 'border-gray-500'}`}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
