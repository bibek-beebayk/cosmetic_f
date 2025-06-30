'use client'

import Link from "next/link"

const blogPosts = [
  {
    id: 1,
    title: '5 Skincare Tips for Glowing Skin',
    slug: '5-skincare-tips-for-glowing-skin',
    summary: 'Discover how to keep your skin radiant with these easy skincare steps you can follow daily.',
    image: '/blog/blog1.jpg',
  },
  {
    id: 2,
    title: 'How to Choose the Right Cleanser',
    slug: 'how-to-choose-the-right-cleanser',
    summary: 'Learn how to pick the perfect cleanser for your skin type, whether it’s oily, dry or sensitive.',
    image: '/blog/blog1.jpg',
  },
  {
    id: 3,
    title: 'Makeup Removal Routine That Works',
    slug: 'makeup-removal-routine-that-works',
    summary: 'Wearing makeup daily? Here’s a gentle but effective night-time routine for clear, happy skin.',
    image: '/blog/blog1.jpg',
  },
]

export default function BlogSection() {
  return (
    <section className="py-10 px-4 max-w-7xl mx-auto">
      <h2 className="text-2xl font-semibold mb-6 text-center">Skincare Tips & Articles</h2>

      <div className="grid md:grid-cols-3 gap-6">
        {blogPosts.map((post) => (
          <div key={post.id} className="border rounded-md shadow-sm hover:shadow-md transition overflow-hidden bg-white">
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-2 text-gray-800">{post.title}</h3>
              <p className="text-sm text-gray-600 mb-3">{post.summary}</p>
              <Link href={`/blog/${post.slug}`} className="text-primary text-sm font-medium hover:underline">
                Read More →
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
