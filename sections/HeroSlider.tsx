'use client'

import { useEffect, useRef, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination, Navigation } from 'swiper/modules'
import { Swiper as SwiperType } from 'swiper/types'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import { Banner } from '@/types/core'

type Props = {
  banners?: Banner[]
}

export default function HeroSlider({ banners = [] }: Props) {
  const prevRef = useRef<HTMLButtonElement | null>(null)
  const nextRef = useRef<HTMLButtonElement | null>(null)
  const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null)

  useEffect(() => {
    if (
      swiperInstance &&
      swiperInstance.params.navigation &&
      typeof swiperInstance.params.navigation !== 'boolean'
    ) {
      swiperInstance.params.navigation.prevEl = prevRef.current
      swiperInstance.params.navigation.nextEl = nextRef.current
      swiperInstance.navigation.init()
      swiperInstance.navigation.update()
    }
  }, [swiperInstance])

  const hasEnoughSlides = banners.length > 1

  return (
    <div className="relative w-full max-w-[100vw] overflow-hidden">
      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        loop={hasEnoughSlides}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        navigation={{
          prevEl: prevRef.current,
          nextEl: nextRef.current,
        }}
        onBeforeInit={(swiper) => {
          // This ensures refs are assigned *before* Swiper tries to use them
          // if (typeof swiper.params.navigation !== 'boolean') {
          //   swiper.params.navigation.prevEl = prevRef.current
          //   swiper.params.navigation.nextEl = nextRef.current
          // }
        }}
        onSwiper={setSwiperInstance}
        className="w-full h-full"
      >
        {banners.map((slide) => (
          <SwiperSlide key={slide.title}>
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-[250px] md:h-[500px] object-cover"
            />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* {hasEnoughSlides && (
        <>
          <button
            ref={prevRef}
            className="swiper-button-prev absolute left-2 top-1/2 z-10 text-black text-2xl -translate-y-1/2"
            aria-label="Previous"
          >
            ‹
          </button>
          <button
            ref={nextRef}
            className="swiper-button-next absolute right-2 top-1/2 z-10 text-black text-2xl -translate-y-1/2"
            aria-label="Next"
          >
            ›
          </button>
        </>
      )} */}
    </div>
  )
}
