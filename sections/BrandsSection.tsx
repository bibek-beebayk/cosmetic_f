'use client'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay } from 'swiper/modules'
import 'swiper/css'

const brands = [
  '/brands/brand1.png',
  '/brands/brand2.png',
  '/brands/brand3.png',
  '/brands/brand1.png',
  '/brands/brand2.png',
  '/brands/brand3.png',
]

export default function BrandsSection() {
  return (
    <section className="py-10 px-4 bg-indigo-200">
      <h2 className="text-2xl font-semibold mb-6 text-center">Shop by Brand</h2>

      <Swiper
        spaceBetween={20}
        slidesPerView={2}
        breakpoints={{
          640: { slidesPerView: 3 },
          768: { slidesPerView: 4 },
          1024: { slidesPerView: 6 },
        }}
        autoplay={{ delay: 2000, disableOnInteraction: false }}
        loop
        modules={[Autoplay]}
      >
        {brands.map((src, i) => (
          <SwiperSlide key={i} className="flex items-center justify-center">
            <img
              src={src}
              alt={`Brand ${i + 1}`}
              className="h-16 object-contain grayscale hover:grayscale-0 transition duration-300 border rounded-lg shadow-md hover:shadow-lg"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  )
}
