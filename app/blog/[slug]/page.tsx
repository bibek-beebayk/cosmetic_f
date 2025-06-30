'use client'

const blog = {
  title: '5 Skincare Tips for Glowing Skin',
  date: '28 Jun 2025',
  image: '/blog/blog1.jpg',
  content: `
Keeping your skin healthy and glowing doesn't require expensive treatments. Here are 5 proven tips:

1. **Cleanse Twice Daily** – to remove dirt, oil, and pollutants.
2. **Hydrate** – Drink water and use a good moisturizer.
3. **Use Sunscreen** – Always apply SPF, even indoors.
4. **Don’t Skip Serums** – Use ones with Vitamin C or Hyaluronic Acid.
5. **Sleep & Diet** – Your skin reflects your lifestyle.

With consistency and care, glowing skin is within reach!
  `,
}

const suggestedPosts = [
  {
    id: 1,
    title: 'Top 10 Must-Have Makeup Items',
    image: '/blog/blog1.jpg',
  },
  {
    id: 2,
    title: 'How to Build Your Skincare Routine',
    image: '/blog/blog1.jpg',
  },
  {
    id: 3,
    title: 'Lipstick Hacks You Should Know',
    image: '/blog/blog1.jpg',
  },
]

export default function BlogDetailsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <img src={blog.image} alt={blog.title} className="w-full h-64 object-cover rounded mb-6" />
      <p className="text-xs text-gray-400 mb-2">{blog.date}</p>
      <h1 className="text-3xl font-bold text-gray-800 mb-4">{blog.title}</h1>
      <div className="prose prose-sm sm:prose lg:prose-lg max-w-none text-gray-700 mb-12">
        {blog.content.split('\n').map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>

      <hr className="my-12" />

      <h2 className="text-xl font-semibold mb-4">You Might Also Like</h2>
      <div className="flex gap-4 overflow-x-auto pb-4">
        {suggestedPosts.map((post) => (
          <div
            key={post.id}
            className="min-w-[200px] max-w-[200px] border rounded-md overflow-hidden shadow hover:shadow-md transition"
          >
            <img src={post.image} alt={post.title} className="w-full h-32 object-cover" />
            <div className="p-3">
              <h3 className="text-sm font-medium text-gray-800 mb-1">{post.title}</h3>
              <a href="#" className="text-primary text-xs font-medium hover:underline">
                Read More →
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
