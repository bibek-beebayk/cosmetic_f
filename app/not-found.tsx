'use client'

import { Suspense } from 'react'

export default function NotFound() {
  return (
    <Suspense fallback={<div>Loading 404...</div>}>
      <h1 className="text-2xl font-bold">Page Not Found</h1>
      <p className="mt-2 text-gray-600">The page you are looking for does not exist.</p>
    </Suspense>
  )
}
