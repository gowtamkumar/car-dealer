'use client'
import React, { useEffect, useState } from 'react'
import CustomCarousel from '../ui/CustomCarousel'
import { Gets } from '../../lib/api'
import appConfig from '../../config'
import { IconButton, Carousel } from '@material-tailwind/react'

const HeroSection = () => {
  const [banners, setBanners] = useState([])

  useEffect(() => {
    ; (async () => {
      const params = { api: 'banners' }
      const res = await Promise.resolve(Gets(params))
      setBanners((res?.data.filter(item => item.isActive)))
      // setBanners((res?.data || []).filter(iten).map((item) => ({ ...item, img: item.photo })))
    })()
  }, [])

  return (
    <section className="min-h-[30vh] lg:min-h-[65vh]">
      <Carousel
        autoplay={true}
        loop={true}
        prevArrow={({ handlePrev }) => {
          return (
            <IconButton
              variant="text"
              color="white"
              size="lg"
              onClick={handlePrev}
              className="!absolute left-4 top-2/4 -translate-y-2/4"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
                />
              </svg>
            </IconButton>
          )
        }}
        nextArrow={({ handleNext }) => {
          return (
            <IconButton
              variant="text"
              color="white"
              size="lg"
              onClick={handleNext}
              className="!absolute !right-4 top-2/4 -translate-y-2/4"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                />
              </svg>
            </IconButton>
          )
        }}
      >
        {(banners || []).map((item, idx) => (
          <div key={idx} className="relative h-full w-full">
            <img
              src={`${appConfig.apiBaseUrl}/uploads/${item.photo || 'user.png'} `}
              alt={`Banner ${idx}`}
              className="h-[30vh] lg:h-[65vh] w-full  object-cover"
            />
            <div
              className="absolute inset-0 grid h-full w-full place-items-center bg-black/5"
            />
          </div>
        ))}
      </Carousel>
    </section>
  )
}

export default HeroSection
