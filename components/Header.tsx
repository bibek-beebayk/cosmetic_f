// Header.tsx
'use client'

import { useAuth } from '@/context/AuthContext'
import { useNavMenu } from '@/hooks/useNavMenu'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { Suspense, useState } from 'react'
import { CiSearch } from 'react-icons/ci'
import { FaBars, FaHeart, FaMapMarkerAlt, FaShoppingCart, FaTimes } from 'react-icons/fa'

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const { data = [] } = useNavMenu()
  const searchParams = useSearchParams()
  const [searchTerm, setSearchTerm] = useState('')
  const router = useRouter()
  const { isAuthenticated, logout } = useAuth()

  console.log("Is Authenticated: ", isAuthenticated)

  const category = searchParams.get('category')

  const handleSearch = () => {
    if (searchTerm) {
      router.push(`/products/?search=${searchTerm}&category=all`)
    }
  }

  const handleLogOutClick = () => {
    logout()
    router.push('/')
  }

  return (
    <Suspense fallback={<div>Loading 404...</div>}>
      <>
        {/* Header Top (not sticky) */}
        <header className="w-full z-40 bg-white border-b shadow-sm">
          {/* Topbar */}
          <div className="w-full bg-black text-white text-[11px] md:text-xs py-2 px-4 flex flex-col md:flex-row justify-between gap-2 md:gap-0">
            <div className="flex flex-wrap justify-center md:justify-start gap-4">
              {isAuthenticated ? (
                <>
                  <div className="hover:underline" onClick={handleLogOutClick}>Logout</div>
                  {/* <a href="#" className="hover:underline">My Orders</a> */}
                </>
              ) : <a href="/login" className="hover:underline">Log In/Sign Up</a>}

              <a href="#" className="hover:underline">Beauty Pass</a>
            </div>
            <div className="flex flex-wrap justify-center md:justify-end gap-4">
              <a href="#" className="hover:underline flex items-center gap-1">
                <FaMapMarkerAlt className="text-[12px]" /> Store & Events
              </a>
              <a href="#" className="hover:underline">Book Beauty Services</a>
              <a href={isAuthenticated ? "/wishlist" : "/login"} className="hover:underline flex items-center gap-1">
                <FaHeart className="text-[12px]" /> Wish List
              </a>
              <a href={isAuthenticated ? "/cart" : "/login"} className="hover:underline flex items-center gap-1">
                <FaShoppingCart className="text-[12px]" /> Cart
              </a>
            </div>
          </div>

          {/* Main Header */}
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between py-3 px-4 gap-4 relative">
            {/* Logo */}
            <Link href="/">
              <img src="/logo.png" alt="Logo" className="h-12 object-contain" />
            </Link>

            {/* Search */}
            <div className="w-full md:flex-1 relative max-w-xl">
              <input
                type="text"
                placeholder="What are you looking for?"
                className="w-full border px-4 py-2 pl-10 pr-16 rounded-full text-sm focus:outline-none"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              {/* Left icon */}
              <CiSearch className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-500 text-lg" />

              {/* Right button */}
              <button
                className="absolute top-1/2 right-1 -translate-y-1/2 bg-black text-white text-xs px-3 py-1 rounded-full hover:bg-gray-800"
                aria-label="Search"
                onClick={handleSearch}
              >
                Search
              </button>
            </div>


            {/* Shipping Info */}
            <div className="hidden md:block text-[11px] md:text-sm text-right text-gray-600 leading-tight">
              <p className="font-semibold">FREE SHIPPING</p>
              <p>FOR ORDERS $25 & ABOVE</p>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="absolute left-4 top-6 -translate-y-1/2 md:hidden text-xl text-gray-700 "
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle Menu"
            >
              {menuOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </header>

        {/* Sticky Navigation */}
        <nav className="sticky top-0 z-50 bg-white border-b">
          {/* Desktop Menu */}
          <div className="max-w-7xl mx-auto px-4 py-2 hidden md:flex gap-6 text-sm font-medium text-gray-700 justify-center">
            {data.map((item, i) => (

              <div key={i} className="relative group">
                <a href={item.link} className={`hover:text-primary transition whitespace-nowrap ${item.link.split("=")[1] == category ? "text-red-600" : "text-black"}`}>
                  {item.title}
                </a>
                {item.submenu && item.submenu.length > 0 && (
                  <div className="absolute top-full left-0 hidden group-hover:block bg-white shadow-md border mt-2 py-2 px-4">
                    {item.submenu.map((sub, j) => (
                      <Link key={j} href={sub.link} className="block py-1 px-2 hover:text-primary">
                        {sub.title}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Mobile Menu */}
          <div
            className={`md:hidden transform transition-all duration-300 ease-in-out origin-top overflow-hidden ${menuOpen ? 'max-h-[1000px] opacity-100 scale-y-100' : 'max-h-0 opacity-0 scale-y-0'}`}
          >
            <div className="flex flex-col px-4 pb-4 text-sm font-medium text-gray-700 border-t">
              {data.map((item, i) => (
                <div key={i}>
                  <a
                    href={item.link}
                    className="py-2 block border-b last:border-b-0 hover:text-primary transition"
                    onClick={() => setMenuOpen(false)}
                  >
                    {item.title}
                  </a>
                  {item.submenu && (
                    <div className="pl-4 text-gray-600">
                      {item.submenu.map((sub, j) => (
                        <a
                          key={j}
                          href={sub.link}
                          className="block py-1 border-b text-sm hover:text-primary"
                          onClick={() => setMenuOpen(false)}
                        >
                          {sub.link}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </nav>
      </>
    </Suspense>

  )
}
