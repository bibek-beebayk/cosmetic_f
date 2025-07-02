'use client'

import { useState } from 'react'
import { FaFilter } from 'react-icons/fa'

const allProducts = [
  {
    id: 1,
    name: 'Velvet Matte Lipstick',
    slug: 'velvet-matte-lipstick',
    brand: 'RARE BEAUTY',
    price: 24.99,
    image: '/products/product1.jpg',
    category: 'Makeup',
  },
  {
    id: 2,
    name: 'Hydrating Moisturizer',
    slug: 'hydrating-moisturizer',
    brand: 'CERAVE',
    price: 32.5,
    image: '/products/product2.jpg',
    category: 'Skincare',
  },
  {
    id: 3,
    name: 'Daily Glow Serum',
    slug: 'daily-glow-serum',
    brand: 'THE ORDINARY',
    price: 19.5,
    image: '/products/product1.jpg',
    category: 'Skincare',
  },
  {
    id: 4,
    name: 'Brow Sculpting Gel',
    slug: 'brow-sculpting-gel',
    brand: 'BENEFIT',
    price: 27,
    image: '/products/product2.jpg',
    category: 'Makeup',
  },
  {
    id: 5,
    name: 'Fragrance Mist - Rose',
    slug: 'fragrance-mist-rose',
    brand: 'VICTORIA\'S SECRET',
    price: 45,
    image: '/products/product1.jpg',
    category: 'Fragrance',
  },
  // Add more items as needed
]

// const categories = ['All', 'Makeup', 'Skincare', 'Fragrance']
const sortOptions = ['Default', 'Price: Low to High', 'Price: High to Low', 'Name: A-Z', 'Name: Z-A']

export default function ProductListPage() {
  const [priceRange, setPriceRange] = useState(100)
  const [searchTerm, setSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState('Default')
  const [visibleCount, setVisibleCount] = useState(6)
  const [showFilters, setShowFilters] = useState(false)

  let filteredProducts = allProducts
    .filter((p) => p.price <= priceRange)
    .filter((p) => p.name.toLowerCase().includes(searchTerm.toLowerCase()))

  switch (sortBy) {
    case 'Price: Low to High':
      filteredProducts.sort((a, b) => a.price - b.price)
      break
    case 'Price: High to Low':
      filteredProducts.sort((a, b) => b.price - a.price)
      break
    case 'Name: A-Z':
      filteredProducts.sort((a, b) => a.name.localeCompare(b.name))
      break
    case 'Name: Z-A':
      filteredProducts.sort((a, b) => b.name.localeCompare(a.name))
      break
  }

  const visibleProducts = filteredProducts.slice(0, visibleCount)

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="flex items-center justify-between mb-6 md:hidden">
        <h1 className="text-xl font-bold">Products</h1>
        <button onClick={() => setShowFilters(true)} className="flex items-center gap-2 text-sm border px-3 py-1 rounded">
          <FaFilter /> Filter
        </button>
      </div>

      {/* Mobile Slide Panel */}
      {showFilters && (
        <div className="fixed inset-0 z-40 bg-amber-100 md:hidden mt-48">
          <div className="absolute top-0 left-0 w-3/4 h-full bg-white p-4 overflow-y-auto transition-transform duration-300 ease-in-out">
            <button onClick={() => setShowFilters(false)} className="mb-4 font-bold text-red-500">Close</button>
            <Filters 
              priceRange={priceRange} 
              setPriceRange={setPriceRange} 
              searchTerm={searchTerm} 
              setSearchTerm={setSearchTerm} 
              sortBy={sortBy} 
              setSortBy={setSortBy} 
              setVisibleCount={setVisibleCount} 
            />
          </div>
        </div>
      )}

      <div className="grid md:grid-cols-4 gap-8">
        {/* Filters Sidebar */}
        <aside className="hidden md:block md:col-span-1 sticky top-24 self-start">
          <Filters 
            priceRange={priceRange} 
            setPriceRange={setPriceRange} 
            searchTerm={searchTerm} 
            setSearchTerm={setSearchTerm} 
            sortBy={sortBy} 
            setSortBy={setSortBy} 
            setVisibleCount={setVisibleCount} 
          />
        </aside>

        {/* Product Grid */}
        <div className="md:col-span-3 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {visibleProducts.length === 0 ? (
            <p className="text-gray-500 text-sm col-span-full">No products found.</p>
          ) : (
            visibleProducts.map((p) => (
              <div key={p.id} className="border rounded-md p-4 shadow-sm hover:shadow-md transition bg-white">
                <img src={p.image} alt={p.name} className="w-full h-48 object-contain mb-3" />
                <h4 className="text-xs text-gray-500 uppercase font-semibold">{p.brand}</h4>
                <p className="text-sm font-medium text-gray-800">{p.name}</p>
                <p className="text-sm font-bold text-gray-900">${p.price.toFixed(2)}</p>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Load More Button */}
      {visibleCount < filteredProducts.length && (
        <div className="flex justify-center mt-10">
          <button
            onClick={() => setVisibleCount((prev) => prev + 6)}
            className="px-6 py-2 text-sm rounded bg-red-500 text-white hover:bg-pink-600"
          >
            Load More
          </button>
        </div>
      )}
    </div>
  )
}

function Filters({ priceRange, setPriceRange, searchTerm, setSearchTerm, sortBy, setSortBy, setVisibleCount }: {
  priceRange: number;
  setPriceRange: (value: number) => void;
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  sortBy: string;
  setSortBy: (value: string) => void;
  setVisibleCount: (value: number) => void;
}) {
  return (
    <div>
      <div className="mb-6">
        <h3 className="font-semibold mb-2">Price: Up to ${priceRange}</h3>
        <input
          type="range"
          min="10"
          max="100"
          step="5"
          value={priceRange}
          onChange={(e) => { setPriceRange(Number(e.target.value)); setVisibleCount(6) }}
          className="w-full"
        />
      </div>

      <div className="mb-6">
        <h3 className="font-semibold mb-2">Search</h3>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search products..."
          className="w-full border px-3 py-1 rounded text-sm"
        />
      </div>

      <div>
        <h3 className="font-semibold mb-2">Sort by</h3>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="w-full border px-2 py-1 text-sm rounded"
        >
          {sortOptions.map((opt) => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
      </div>
    </div>
  )
}

