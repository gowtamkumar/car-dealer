import React from 'react'
import { Carousel, IconButton } from '@material-tailwind/react'

const CustomCarousel = ({ data, height, navigation, arrow, opacity }) => {
  return (
    <Carousel
      autoplay
      prevArrow={({ handlePrev }) => {
        if (!arrow) return
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
        if (!arrow) return
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
      navigation={({ setActiveIndex, activeIndex, length }) => {
        if (!navigation) return
        return (
          <div className="absolute bottom-4 left-2/4 z-50 flex -translate-x-2/4 gap-2">
            {new Array(length).fill('').map((_, i) => (
              <span
                key={i}
                className={`block h-1 cursor-pointer rounded-2xl transition-all content-[''] ${
                  activeIndex === i ? 'w-8 bg-white' : 'w-4 bg-white/50'
                }`}
                onClick={() => setActiveIndex(i)}
              />
            ))}
          </div>
        )
      }}
    >
      {(data || []).map((item, idx) => (
        <div key={idx} className="relative h-full w-full">
          <img
            src={item.img}
            alt={`Banner ${idx}`}
            className={` ${height} w-full  object-cover `}
          />
          <div
            className={`absolute inset-0 grid h-full w-full place-items-center ${
              opacity && 'bg-black/40'
            }`}
          ></div>
        </div>
      ))}
    </Carousel>
  )
}

export default CustomCarousel
