'use client'
import React, { useState } from 'react'
import { Carousel, Dialog, IconButton } from '@material-tailwind/react'
import appConfig from '../../config'
import Image from 'next/image'

const CustomCarousel = ({ data, height, navigation, arrow, opacity, view, autoPlay }) => {
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState(null)
  const [imgList, setImgList] = useState([])

  const handleOpen = (key) => {
    if (!view) return
    setOpen(!open)
    if (!open) {
      setImgList(data)
      setActive(key)
    } else {
      setImgList([])
      setActive(null)
    }
  }

  return (
    <div>
      <Carousel
        autoplay={autoPlay}
        loop={autoPlay}
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
                  className={`block h-1 cursor-pointer rounded-2xl transition-all content-[''] ${activeIndex === i ? 'w-8 bg-white' : 'w-4 bg-white/50'
                    }`}
                  onClick={() => setActiveIndex(i)}
                />
              ))}
            </div>
          )
        }}
      >
        {(data || []).map((item, idx) => (
          <div key={idx} onClick={() => handleOpen(idx)} className="relative h-full w-full">
            <img
              src={`${appConfig.apiBaseUrl}/uploads/${item || 'no-data.png'}`}
              alt={`Banner ${idx}`}
              className={` ${height} w-full  object-cover `}
            />
            <div
              className={`absolute inset-0 grid h-full w-full place-items-center ${opacity && 'bg-black/30'
                }`}
            />
          </div>
        ))}
      </Carousel>

      <Dialog size="xl" className="min-h-[70vh] overflow-hidden" open={open} handler={handleOpen}>
        <div className="relative h-[60vh] w-full">
          <Image
            placeholder='blur'
            src={`${appConfig.apiBaseUrl}/uploads/${imgList[active] || 'no-data.png'}`}
            alt={`Banner ${imgList[0]?.key}`}
            className={`h-full w-full cursor-pointer object-cover `}
          />
          <div
            className={`absolute inset-0 grid h-full w-full place-items-center ${opacity && 'bg-black/30'
              }`}
          />
        </div>
        <div className="my-3 flex items-center justify-center gap-3">
          {imgList.map((item, idx) => (
            <div
              onClick={() => setActive(idx)}
              key={idx}
              className="relative cursor-pointer overflow-hidden"
            >
              <Image placeholder='blur' src={`${appConfig.apiBaseUrl}/uploads/${item || 'no-data.png'}`} className="h-20 w-20 rounded-md" alt="" />
              <div
                className={`absolute inset-0 grid h-full w-full place-items-center transition-all  duration-200 ease-linear ${active !== idx && 'bg-black/70'
                  }`}
              ></div>
            </div>
          ))}
        </div>
      </Dialog>
    </div>
  )
}

export default CustomCarousel
