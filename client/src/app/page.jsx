'use client'
import { Carousel, IconButton } from '@material-tailwind/react'
import React from 'react'

const Home = () => {
  return (
    <main>
      <section className="min-h-[30vh]  bg-red-100 lg:min-h-[60vh]">
        <Carousel
          autoplay
          prevArrow={({ handlePrev }) => (
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
          )}
          nextArrow={({ handleNext }) => (
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
          )}
        >
          <div className="relative h-full w-full">
            <img
              src="https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="image 1"
              className="h-[30vh]  w-full  object-cover lg:h-[60vh]"
            />
            <div className="absolute inset-0 grid h-full w-full place-items-center bg-black/50"></div>
          </div>
          <div className="relative h-full w-full">
            <img
              src="https://images.unsplash.com/photo-1494905998402-395d579af36f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="image 1"
              className="h-[30vh]  w-full  object-cover lg:h-[60vh]"
            />
            <div className="absolute inset-0 grid h-full w-full place-items-center bg-black/50"></div>
          </div>
          <div className="relative h-full w-full">
            <img
              src="https://images.unsplash.com/photo-1580273916550-e323be2ae537?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="image 1"
              className="h-[30vh]  w-full  object-cover lg:h-[60vh]"
            />
            <div className="absolute inset-0 grid h-full w-full place-items-center bg-black/50"></div>
          </div>
        </Carousel>
      </section>
      <section className="container relative z-20 mx-auto min-h-[15vh] w-[90%] rounded-md bg-gray-50 lg:-mt-12 lg:min-h-[20vh] lg:w-2/4">
        <div className="absolute -top-9 left-0 z-10">
          <div className="flex items-center">
            <div className="flex-grow rounded-t-sm bg-red-50 px-5 py-2 text-center text-lg font-bold">
              Used
            </div>
            <div className="flex-grow rounded-t-sm bg-red-50 px-5 py-2 text-center text-lg font-bold">
              New
            </div>
            <div className="flex-grow rounded-t-sm bg-gray-50 px-5 py-2 text-center text-lg font-bold">
              Reconditon
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto my-10 min-h-[40vh] border bg-indigo-100 lg:my-20"></section>
      <section className="container mx-auto my-10 min-h-[40vh] border bg-orange-50 lg:my-20"></section>
    </main>
  )
}

export default Home
