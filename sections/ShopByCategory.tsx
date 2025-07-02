'use client'

import { CategoryData } from "@/types/core"
import Link from "next/link"

// const categories = [
//   { title: 'Skincare', image: '/categories/skincare.jpg' },
//   { title: 'Makeup', image: '/categories/skincare.jpg' },
//   { title: 'Fragrance', image: '/categories/skincare.jpg' },
//   { title: 'Haircare', image: '/categories/skincare.jpg' },
//   { title: 'Bath & Body', image: '/categories/skincare.jpg' },
//   { title: 'Tools & Brushes', image: '/categories/skincare.jpg' },
// ]

type Props = {  categories?: CategoryData[]
}

export default function ShopByCategory({categories = [] }: Props) {
  return (
    <section className="py-10 px-4 max-w-7xl mx-auto bg-violet-100">
      <h2 className="text-2xl font-semibold mb-6 text-center">Shop by Category</h2>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {categories.map((cat, i) => (
          <Link key={i} href={`/products/?category=${cat.slug}`} className="group relative overflow-hidden rounded-lg shadow hover:shadow-lg transition-all">
            <img
              src={cat.image}
              alt={cat.name}
              className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="flex items-end justify-center text-md font-bold bg-amber-50 text-gray-600">{cat.name}</div>
            <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center text-white text-lg font-semibold opacity-0 group-hover:opacity-70 transition-opacity">
              {cat.name}
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
