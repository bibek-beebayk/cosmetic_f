'use client'

import React from 'react'

interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

export default function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  const getVisiblePages = (current: number, total: number): (number | '...')[] => {
    const delta = 2
    const range: (number | '...')[] = []
    const left = Math.max(2, current - delta)
    const right = Math.min(total - 1, current + delta)

    range.push(1)
    if (left > 2) range.push('...')

    for (let i = left; i <= right; i++) {
      range.push(i)
    }

    if (right < total - 1) range.push('...')
    if (total > 1) range.push(total)

    return range
  }

  const pages = getVisiblePages(currentPage, totalPages)

  return (
    <div className="flex justify-center mt-10 space-x-2 flex-wrap text-sm">
      {/* Previous */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`px-3 py-1 rounded border ${
          currentPage === 1
            ? 'text-gray-400 border-gray-300 cursor-not-allowed'
            : 'hover:bg-gray-100'
        }`}
      >
        Previous
      </button>

      {/* Page numbers */}
      {pages.map((page, index) =>
        page === '...' ? (
          <span key={`ellipsis-${index}`} className="px-3 py-1">...</span>
        ) : (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`px-3 py-1 rounded border ${
              page === currentPage
                ? 'bg-red-500 text-white'
                : 'bg-white text-black hover:bg-gray-100'
            }`}
          >
            {page}
          </button>
        )
      )}

      {/* Next */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`px-3 py-1 rounded border ${
          currentPage === totalPages
            ? 'text-gray-400 border-gray-300 cursor-not-allowed'
            : 'hover:bg-gray-100'
        }`}
      >
        Next
      </button>
    </div>
  )
}
