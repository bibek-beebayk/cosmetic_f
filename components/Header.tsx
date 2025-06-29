'use client'

import { useState } from 'react'
import { FaHeart, FaShoppingBag, FaShoppingCart, FaMapMarkerAlt, FaBars, FaTimes } from 'react-icons/fa'
import { CiSearch } from 'react-icons/ci'
import Link from 'next/link'

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null)

  const navItems = [
    { title: 'New' },
    { title: 'Makeup', submenu: ['Face', 'Eyes', 'Lips'] },
    { title: 'Skincare', submenu: ['Moisturizers', 'Cleansers', 'Serums'] },
    { title: 'Hair' },
    { title: 'Tools & Brushes' },
    { title: 'Bath & Body' },
    { title: 'Fragrance' },
    { title: 'Clean' },
    { title: 'Gifts & Gift Cards' },
    { title: 'Brands' },
    { title: 'Sale' },
  ]

  return (
    <header className="w-full sticky top-0 z-50 bg-white border-b shadow-sm">
      {/* Topbar */}
      <div className="w-full bg-black text-white text-[11px] md:text-xs py-2 px-4 flex flex-col md:flex-row justify-between gap-2 md:gap-0">
        <div className="flex flex-wrap justify-center md:justify-start gap-4">
          <a href="#" className="hover:underline">Log In/Sign Up</a>
          <a href="#" className="hover:underline">Beauty Pass</a>
        </div>
        <div className="flex flex-wrap justify-center md:justify-end gap-4">
          <a href="#" className="hover:underline flex items-center gap-1">
            <FaMapMarkerAlt className="text-[12px]" /> Store & Events
          </a>
          <a href="#" className="hover:underline">Book Beauty Services</a>
          <a href="/wishlist" className="hover:underline flex items-center gap-1">
            <FaHeart className="text-[12px]" /> Wish List
          </a>
          <a href="/cart" className="hover:underline flex items-center gap-1">
            <FaShoppingCart className="text-[12px]" /> Cart
          </a>
        </div>
      </div>

      {/* Main Header */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between py-3 px-4 gap-4 relative">
        {/* Logo */}
        <img src="/logo.png" alt="Logo" className="h-12 object-contain" />

        {/* Search */}
        <div className="w-full md:flex-1 relative max-w-xl">
          <input
            type="text"
            placeholder="What are you looking for?"
            className="w-full border px-4 py-2 pl-10 rounded-full text-sm focus:outline-none"
          />
          <CiSearch className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-500 text-lg" />
        </div>

        {/* Shipping Info */}
        <div className="hidden md:block text-[11px] md:text-sm text-right text-gray-600 leading-tight">
          <p className="font-semibold">FREE SHIPPING</p>
          <p>FOR ORDERS $25 & ABOVE</p>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="absolute left-4 top-6 -translate-y-1/2 md:hidden text-xl text-gray-700"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle Menu"
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Navigation */}
      <nav className="bg-white border-t">
        {/* Desktop Menu */}
        <div className="max-w-7xl mx-auto px-4 py-2 hidden md:flex gap-6 text-sm font-medium text-gray-700 justify-center">
          {navItems.map((item, i) => (
            <div key={i} className="relative group">
              <a href="#" className="hover:text-primary transition whitespace-nowrap">
                {item.title}
              </a>
              {item.submenu && (
                <div className="absolute top-full left-0 hidden group-hover:block bg-white shadow-md border mt-2 py-2 px-4">
                  {item.submenu.map((sub, j) => (
                    <Link key={j} href="#" className="block py-1 px-2 hover:text-primary">
                      {sub}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Mobile Menu (animated slide-in) */}
        <div
          className={`md:hidden transform transition-all duration-300 ease-in-out origin-top overflow-hidden ${menuOpen ? 'max-h-[1000px] opacity-100 scale-y-100' : 'max-h-0 opacity-0 scale-y-0'}`}
        >
          <div className="flex flex-col px-4 pb-4 text-sm font-medium text-gray-700 border-t">
            {navItems.map((item, i) => (
              <div key={i}>
                <a
                  href="#"
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
                        href="#"
                        className="block py-1 border-b text-sm hover:text-primary"
                        onClick={() => setMenuOpen(false)}
                      >
                        {sub}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </nav>
    </header>
  )
}
