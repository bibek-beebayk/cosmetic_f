'use client'

import { useRef } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination, Navigation } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

const banners = [
  { id: 1, image: '/banners/banner1.jpg', alt: 'New arrivals' },
  { id: 2, image: '/banners/banner2.jpg', alt: 'Best sellers' },
  { id: 3, image: '/banners/banner3.jpg', alt: 'Fragrance offers' },
]

export default function HeroSlider() {
  const prevRef = useRef(null)
  const nextRef = useRef(null)

  return (
    <div className="w-full max-w-[100vw] overflow-hidden relative">
      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        navigation={{
          prevEl: prevRef.current,
          nextEl: nextRef.current,
        }}
        onBeforeInit={(swiper) => {
        //   if (typeof swiper.params.navigation !== 'boolean') {
        //     swiper.params.navigation.prevEl = prevRef.current
        //     swiper.params.navigation.nextEl = nextRef.current
        //   }
        }}
        loop
        className="w-full h-full"
      >
        {banners.map((slide) => (
          <SwiperSlide key={slide.id}>
            <img
              src={slide.image}
              alt={slide.alt}
              className="w-full h-[250px] md:h-[500px] object-cover"
            />
          </SwiperSlide>
        ))}

        {/* Custom Navigation Buttons */}
        <button
          ref={prevRef}
          className="swiper-button-prev absolute left-2 top-1/2 z-10 text-black text-xl -translate-y-1/2"
        >
          ‹
        </button>
        <button
          ref={nextRef}
          className="swiper-button-next absolute right-2 top-1/2 z-10 text-black text-xl -translate-y-1/2"
        >
          ›
        </button>
      </Swiper>
    </div>
  )
}
