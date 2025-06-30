'use client'

import { useState } from 'react'
import { FaStar, FaHeart } from 'react-icons/fa'

const product = {
  name: 'Artist Color Pencil',
  brand: 'MAKE UP FOR EVER',
  price: 37.0,
  rating: 4.6,
  reviews: 2381,
  description:
    'A cult-favorite, ultra-blendable pencil that can be used on lips, brows, eyes and face to contour and create any look.',
  variants: [
    { id: 'v1', name: 'Boundless Berry', swatch: '#884553' },
    { id: 'v2', name: 'Endless Cacao', swatch: '#5e4433' },
    { id: 'v3', name: 'Limitless Brown', swatch: '#6d4c41' },
  ],
  images: [
    '/products/product1.jpg',
    '/products/product2.jpg',
    '/products/product1.jpg',
  ],
  reviewsData: [
    {
      id: 1,
      name: 'Evita',
      location: 'Australia',
      date: '27 Jun 2025',
      rating: 5,
      title: '602 Completely Sepia - Universal and comfy',
      content: 'Nicely pigmented, comfortable on the eyes and lips. One will last a while.',
    },
    {
      id: 2,
      name: 'pororo',
      location: 'Malaysia',
      date: '27 Jun 2025',
      rating: 5,
      title: '600 Anywhere Caffeine - my holy grail',
      content: "It's so blendable and easy to work with. You definitely have to apply it again after eating because it's not waterproof. I still love it and am not bothered with the fact of reapplying.",
    },
    {
      id: 3,
      name: 'Liv',
      location: 'Australia',
      date: '26 Jun 2025',
      rating: 5,
      title: '600 Anywhere Caffeine - perfect shade',
      content: "Love this liner as it's the perfect summer shade. Wish it was a long wear",
    },
  ],
}

export default function ProductDetailsPage() {
  const [selectedVariant, setSelectedVariant] = useState(product.variants[0])
  const [quantity, setQuantity] = useState(1)
  const [mainImage, setMainImage] = useState(product.images[0])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalIndex, setModalIndex] = useState(0)

  const handlePrev = () => {
    const newIndex = modalIndex === 0 ? product.images.length - 1 : modalIndex - 1
    setModalIndex(newIndex)
    setMainImage(product.images[newIndex])
  }

  const handleNext = () => {
    const newIndex = modalIndex === product.images.length - 1 ? 0 : modalIndex + 1
    setModalIndex(newIndex)
    setMainImage(product.images[newIndex])
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="grid md:grid-cols-2 gap-8">
        {/* Product Images */}
        <div>
          <img
            src={mainImage}
            alt={product.name}
            onClick={() => {
              setIsModalOpen(true)
              setModalIndex(product.images.indexOf(mainImage))
            }}
            className="w-full h-auto object-cover rounded transition-transform duration-300 hover:scale-110 cursor-zoom-in"
          />

          <div className="flex gap-2 mt-4">
            {product.images.map((img, idx) => (
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
          <h2 className="text-sm text-gray-500 uppercase mb-1">{product.brand}</h2>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">{product.name}</h1>

          {/* Rating */}
          <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
            <span className="text-yellow-500">{'★'.repeat(Math.floor(product.rating))}</span>
            <span>{product.rating}</span>
            <span>({product.reviews} reviews)</span>
          </div>

          {/* Price */}
          <p className="text-xl font-semibold text-gray-900 mb-4">${product.price.toFixed(2)}</p>

          {/* Variant Swatches */}
          <div className="mb-4">
            <h3 className="text-sm font-semibold mb-2">Shade: {selectedVariant.name}</h3>
            <div className="flex gap-2">
              {product.variants.map((variant) => (
                <button
                  key={variant.id}
                  onClick={() => setSelectedVariant(variant)}
                  className={`w-6 h-6 rounded-full border-2 ${selectedVariant.id === variant.id ? 'border-black scale-110' : 'border-gray-300'}`}
                  style={{ backgroundColor: variant.swatch }}
                />
              ))}
            </div>
          </div>

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
            <p className="text-sm text-gray-700 leading-relaxed">{product.description}</p>
          </div>
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

          <div className="relative w-full max-w-4xl px-4">
            <button
              onClick={handlePrev}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 text-white text-3xl px-4 py-2"
              aria-label="Previous image"
            >
              ‹
            </button>

            <img
              src={product.images[modalIndex]}
              alt="Zoomed"
              className="w-full h-auto object-contain rounded transition duration-300 ease-in-out"
            />

            <button
              onClick={handleNext}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 text-white text-3xl px-4 py-2"
              aria-label="Next image"
            >
              ›
            </button>
          </div>

          <div className="mt-4 flex gap-2 overflow-x-auto px-4">
            {product.images.map((img, i) => (
              <img
                key={i}
                src={img}
                alt={`Modal thumb ${i + 1}`}
                onClick={() => {
                  setModalIndex(i)
                  setMainImage(img)
                }}
                className={`w-16 h-16 object-cover rounded cursor-pointer border transition duration-200 ${
                  i === modalIndex ? 'border-white scale-105' : 'border-gray-500'
                }`}
              />
            ))}
          </div>
        </div>
      )}

      {/* Reviews Section */}
      <div className="mt-16">
        <h2 className="text-2xl font-semibold mb-4">Reviews</h2>
        <div className="mb-6">
          <p className="text-3xl font-bold text-gray-800">{product.rating.toFixed(1)}</p>
          <div className="flex items-center gap-2 text-yellow-500">
            {'★'.repeat(Math.floor(product.rating))}
          </div>
          <p className="text-sm text-gray-500">Based on {product.reviews} reviews</p>
        </div>

        <div className="space-y-6">
          {product.reviewsData.map((review) => (
            <div key={review.id} className="border-b pb-4">
              <div className="flex justify-between items-center text-sm text-gray-500 mb-1">
                <span>{review.date}</span>
                <span>{review.name} • {review.location}</span>
              </div>
              <div className="text-yellow-500 text-sm">{'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}</div>
              <p className="font-semibold text-sm text-gray-800 mt-1">{review.title}</p>
              <p className="text-sm text-gray-700 mt-1">{review.content}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Recommended Products */}
      <div className="mt-16">
        <h2 className="text-2xl font-semibold mb-6">Recommended for You</h2>
        <div className="relative overflow-hidden">
          <div className="flex gap-4 overflow-x-auto pb-4">
            {[{
              id: 1,
              name: 'Kind Words Matte Lip Liner',
              brand: 'RARE BEAUTY',
              price: 29.0,
              rating: 4.5,
              image: '/products/product1.jpg',
            }, {
              id: 2,
              name: 'Easy Bake Loose Powder',
              brand: 'HUDA BEAUTY',
              price: 70.0,
              rating: 4.8,
              image: '/products/product1.jpg',
            }, {
              id: 3,
              name: 'HD Skin Face Essentials Palette',
              brand: 'MAKE UP FOR EVER',
              price: 145.0,
              rating: 4.6,
              image: '/products/product1.jpg',
            }, {
              id: 4,
              name: 'On Til Dawn Setting Spray',
              brand: 'ONE/SIZE',
              price: 60.0,
              rating: 4.7,
              image: '/products/product1.jpg',
            }, {
              id: 5,
              name: 'I Need A Nude Lip Crayon',
              brand: 'NATASHA DENONA',
              price: 43.0,
              rating: 4.9,
              image: '/products/product1.jpg',
            }].map((item) => (
              <div key={item.id} className="min-w-[200px] max-w-[200px] border rounded-md p-3 bg-white shadow hover:shadow-md transition">
                <img src={item.image} alt={item.name} className="w-full h-40 object-contain mb-3" />
                <h4 className="text-xs font-bold text-gray-700 uppercase mb-1">{item.brand}</h4>
                <p className="text-sm text-gray-800 mb-1 line-clamp-2">{item.name}</p>
                <p className="text-sm font-semibold text-gray-900 mb-1">${item.price.toFixed(2)}</p>
                <div className="text-red-500 text-xs">
                  {'★'.repeat(Math.floor(item.rating))}{'☆'.repeat(5 - Math.floor(item.rating))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
