'use client'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import CardProduct from '../products/CardProduct'
import { BiSearchAlt } from 'react-icons/bi'
import { FireIcon } from '@heroicons/react/24/outline'
import { Typography } from '@material-tailwind/react'
import { Gets } from '../../lib/api'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';

const UsedCarSection = () => {
  const [car, setCar] = useState([])
  const [view, setView] = useState(4)

  useEffect(() => {
    ; (async () => {
      const params = { api: 'products' }
      const res = await Promise.resolve(Gets(params))
      const filter = (res.data || []).filter(item => item.condition === 'Used' && item.status === 'Approved')
      setCar(filter)
    })()
  }, [])

  useEffect(() => {
    window.innerWidth > 600 ? setView(4) : setView(1)
  }, []);

  return (
    <section className={`my-5 bg-red-50/5 lg:my-10 py-5 ${car?.length > 0 ? 'block' : 'hidden'}`}>
      <div className="container mx-auto">
        <div className="flex items-center justify-between">
          <h1 className="py-3 text-2xl font-semibold">
            <FireIcon className="me-2 inline-block h-[24px] w-[24px] text-red-500" />
            <span className="italic text-red-400">Featured</span>{' '}
            <span className="font-light">Used Car</span>
          </h1>

          <Typography
            as={Link}
            href="/products"
            variant="small"
            color="blue-gray"
            className="group/item cursor-pointer font-normal hover:underline"
          >
            <BiSearchAlt className="inline-block transition-all duration-150 ease-linear group-hover/item:-translate-x-2" />
            <span>View All</span>
          </Typography>
        </div>
        <Swiper
          slidesPerView={view}
          spaceBetween={30}
          pagination={{
            clickable: true,
          }}
          modules={[Pagination]}
          className="mySwiper"
        >
          {
            (car || []).map((item, idx) => (
              <SwiperSlide key={idx} className="col-span-6 lg:col-span-3">
                <CardProduct data={item} />
              </SwiperSlide>
            ))
          }
        </Swiper>
      </div>
    </section>
  )
}

export default UsedCarSection
