'use client'

import Link from "next/link"

const blogPosts = [
  {
    id: 1,
    title: '5 Skincare Tips for Glowing Skin',
    slug: '5-skincare-tips-for-glowing-skin',
    summary: 'Simple daily habits that can transform your complexion. Backed by dermatologists and real users.',
    image: '/blog/blog1.jpg',
    date: '28 Jun 2025',
  },
  {
    id: 2,
    title: 'Top 10 Must-Have Makeup Items',
    slug: 'top-10-must-have-makeup-items',
    summary: 'From foundation to finishing spray, see our 2025 faves ranked by pros.',
    image: '/blog/blog1.jpg',
    date: '20 Jun 2025',
  },
  {
    id: 3,
    title: 'How to Build Your Skincare Routine',
    slug: 'how-to-build-your-skincare-routine',
    summary: 'Morning vs. night, active ingredients, layering order – simplified!',
    image: '/blog/blog1.jpg',
    date: '15 Jun 2025',
  },
]

export default function BlogListPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-10 text-center">Our Beauty Blog</h1>
      <div className="grid gap-8 md:grid-cols-3 sm:grid-cols-2">
        {blogPosts.map((post) => (
          <div
            key={post.id}
            className="border rounded-md overflow-hidden shadow hover:shadow-lg transition"
          >
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <p className="text-xs text-gray-400 mb-1">{post.date}</p>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">{post.title}</h3>
              <p className="text-sm text-gray-600 mb-3 line-clamp-3">{post.summary}</p>
              <Link href={`/blog/${post.slug}`} className="text-primary hover:underline text-sm font-medium">
                Read More →
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
