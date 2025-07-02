'use client'

import LoadingSpinner from '@/components/LoadingSpinner'
import Pagination from '@/components/Pagination'
import ProductCard from '@/components/ProductCard'
import { addToCart, toggleWishlist } from '@/lib/api/product'
import { apiCall } from '@/lib/axios'
import { PaginationType, ProductList } from '@/types/core'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { FaFilter } from 'react-icons/fa'


// const categories = ['All', 'Makeup', 'Skincare', 'Fragrance']
const sortOptions = [
  { label: 'Default', value: '' },
  { label: 'Price: Low to High', value: 'price_asc' },
  { label: 'Price: High to Low', value: 'price_desc' },
  { label: 'Name: A-Z', value: 'name_asc' },
  { label: 'Name: Z-A', value: 'name_desc' },
]

type Response = {
  results: ProductList[]
  pagination: PaginationType
}

export default function ProductListPage() {
  // const [priceRange, setPriceRange] = useState(100)
  // const [searchTerm, setSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState('Default')
  const [visibleCount, setVisibleCount] = useState(6)
  const [showFilters, setShowFilters] = useState(false)
  const [products, setProducts] = useState<ProductList[]>()
  const [pagination, setPagination] = useState<PaginationType>()
  const [page, setPage] = useState(1)
  const [minPrice, setMinPrice] = useState<number | ''>('')
  const [maxPrice, setMaxPrice] = useState<number | ''>('')

  const searchParams = useSearchParams();
  const search = searchParams.get('search') || ''
  const category = searchParams.get('category') || ''

  const [wishListToggled, setWishListToggled] = useState(false)

  console.log("Category: ", category)

  // useEffect(() => {
  //   const search = searchParams.get("search")
  //   if (search) {
  //     setSearchTerm(search)
  //   }
  // }, [searchParams])

  const requestParams = {
    min_price: minPrice || undefined,
    max_price: maxPrice || undefined,
    search: search || undefined,
    sort: sortBy,
    page: page,
    category: category || undefined
  }


  useEffect(() => {
    const fetchProducts = async () => {
      const res = await apiCall<Response>('get', '/product/', undefined, { params: requestParams })
      // Simulate fetching products from an API
      console.log('Fetched products:', res)
      setProducts(res.results)
      setPagination(res.pagination)
    }
    fetchProducts()
  }, [minPrice, maxPrice, sortBy, page, search, category, wishListToggled])

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [page]);

  if (!products) return <LoadingSpinner />

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="flex items-center justify-between mb-6 md:hidden">
        <h1 className="text-xl font-bold">{category?.toUpperCase()}</h1>
        <button onClick={() => setShowFilters(true)} className="flex items-center gap-2 text-sm border px-3 py-1 rounded">
          <FaFilter /> Filter
        </button>
      </div>

      {/* Mobile Slide Panel */}
      {showFilters && (
        <>
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black bg-opacity-40 z-40"
            onClick={() => setShowFilters(false)}
          />

          {/* Slide Panel */}
          <div className="fixed top-0 right-0 w-4/5 h-full bg-white z-50 shadow-lg transform translate-x-0 transition-transform duration-300 ease-in-out">
            <div className="flex items-center justify-between px-4 py-3 border-b">
              <h2 className="text-lg font-semibold">Filters</h2>
              <button
                onClick={() => setShowFilters(false)}
                className="text-red-500 text-sm font-semibold hover:underline"
              >
                Close
              </button>
            </div>

            <div className="p-4 overflow-y-auto h-[calc(100%-56px)]">
              <Filters
                minPrice={minPrice}
                setMinPrice={setMinPrice}
                maxPrice={maxPrice}
                setMaxPrice={setMaxPrice}
                sortBy={sortBy}
                setSortBy={setSortBy}
                setVisibleCount={setVisibleCount}
              />
            </div>
          </div>
        </>
      )}


      <div className="grid md:grid-cols-4 gap-8">
        {/* Filters Sidebar */}
        <aside className="hidden md:block md:col-span-1 sticky top-24 self-start">
          <Filters
            minPrice={minPrice}
            setMinPrice={setMinPrice}
            maxPrice={maxPrice}
            setMaxPrice={setMaxPrice}
            // searchTerm={searchTerm}
            // setSearchTerm={setSearchTerm}
            sortBy={sortBy}
            setSortBy={setSortBy}
            setVisibleCount={setVisibleCount}
          />
        </aside>

        {/* Product Grid */}
        <div className="grid-cols-2 md:col-span-3 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products?.length === 0 ? (
            <p className="text-gray-500 text-sm col-span-full">No products found.</p>
          ) : (
            products?.map((p) => (
              <ProductCard
                product={p}
                key={p.slug}
                onWishlistToggle={async () => {
                  try {
                    await toggleWishlist(p.id)
                    setWishListToggled((prev) => !prev)
                    // Optionally update local product state here
                  } catch (err) {
                    console.error('Wishlist toggle failed', err)
                  }
                }}
                onAddToCart={async () => {
                  try {
                    await addToCart(p.id)
                    // Optionally show toast/snackbar
                  } catch (err) {
                    console.error('Add to cart failed', err)
                  }
                }}
              />
            ))
          )}
        </div>
      </div>

      {/* Load More Button */}
      {/* {pagination && pagination.next && (
        <div className="flex justify-center mt-10">
          <button
            onClick={() => setVisibleCount((prev) => prev + 6)}
            className="px-6 py-2 text-sm rounded bg-red-500 text-white hover:bg-pink-600"
          >
            Load More
          </button>
        </div>
      )} */}

      {/* Load More Button for Mobile */}
      {/* <div className="flex justify-center mt-10">
        <button
          onClick={() => setVisibleCount((prev) => prev + 6)}
          className="px-6 py-2 text-sm rounded bg-red-500 text-white hover:bg-pink-600"
        >
          Load More
        </button>
      </div> */}
      {pagination && pagination.pages > 1 && (
        <Pagination
          currentPage={pagination.page}
          totalPages={pagination.pages}
          onPageChange={(page) => setPage(page)}
        />
      )}
    </div>
  )
}

function Filters({
  minPrice, setMinPrice,
  maxPrice, setMaxPrice,
  // searchTerm, setSearchTerm,
  sortBy, setSortBy,
  setVisibleCount
}: {
  minPrice: number | '',
  setMinPrice: (val: number | '') => void,
  maxPrice: number | '',
  setMaxPrice: (val: number | '') => void,
  // searchTerm: string,
  // setSearchTerm: (val: string) => void,
  sortBy: string,
  setSortBy: (val: string) => void,
  setVisibleCount: (val: number) => void
}) {
  {
    return (
      <div>
        <div className="mb-6">
          <h3 className="font-semibold mb-2">Price Range</h3>
          <div className="flex items-center gap-3">
            <input
              type="number"
              placeholder="Min"
              value={minPrice}
              onChange={(e) => {
                const value = e.target.value
                setMinPrice(value === '' ? '' : Math.max(0, Number(value)))
                setVisibleCount(6)
              }}
              className="w-1/2 border px-2 py-1 rounded text-sm"
            />
            <span>to</span>
            <input
              type="number"
              placeholder="Max"
              value={maxPrice}
              onChange={(e) => {
                const value = e.target.value
                setMaxPrice(value === '' ? '' : Math.max(0, Number(value)))
                setVisibleCount(6)
              }}
              className="w-1/2 border px-2 py-1 rounded text-sm"
            />
          </div>
        </div>




        <div>
          <h3 className="font-semibold mb-2">Sort by</h3>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="w-full border px-2 py-1 text-sm rounded"
          >
            {sortOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>
      </div>
    )
  }
}
