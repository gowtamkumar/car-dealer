import { Carousel, Dialog, IconButton } from '@material-tailwind/react'
import React, { useState } from 'react'

const ProductImage = ({ data }) => {
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState(null)
  const [imgList, setImgList] = useState([])

  const handleOpen = (key) => {
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
    <div className="col-span-12 p-5 lg:col-span-5 lg:p-0">
      <Carousel
        autoplay
        loop={true}
        autoplayDelay={6000}
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
        navigation={({ setActiveIndex, activeIndex, length }) => {
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
          <div
            onClick={() => handleOpen(idx)}
            key={idx}
            className="relative h-full w-full overflow-hidden rounded-md"
          >
            <img
              src={item.img}
              alt={`Banner ${idx}`}
              className={`h-96 w-full cursor-pointer rounded-md object-cover `}
            />
            <div className={`absolute inset-0 grid h-full w-full place-items-center`}></div>
          </div>
        ))}
      </Carousel>

      <Dialog size="xl" className="min-h-[70vh] overflow-hidden" open={open} handler={handleOpen}>
        <div className="h-[60vh] w-full">
          <img
            src={imgList[active]?.img}
            alt={`Banner ${imgList[0]?.key}`}
            className={`h-full w-full cursor-pointer object-cover `}
          />
        </div>
        <div className="my-3 flex items-center justify-center gap-3">
          {imgList.map((item, idx) => (
            <div
              onClick={() => setActive(idx)}
              key={idx}
              className="relative cursor-pointer overflow-hidden"
            >
              <img src={item.img} className="h-20 w-32 rounded-md" alt="" />
              <div
                className={`absolute inset-0 grid h-full w-full place-items-center transition-all  duration-200 ease-linear ${
                  active !== idx && 'bg-black/70'
                }`}
              ></div>
            </div>
          ))}
        </div>
      </Dialog>
    </div>
  )
}

export default ProductImage
