'use client'
import React from 'react'
import Link from 'next/link'
import CardProduct from '../ui/CardProduct'
import { carouselData } from '../../config'
import { BiSearchAlt } from 'react-icons/bi'
import { FireIcon } from '@heroicons/react/24/outline'
import { Typography } from '@material-tailwind/react'

const newCarData = [{ carouselData }, { carouselData }, { carouselData }, { carouselData }]

const ReconditionCar = () => {
  return (
    <section className="mx-auto my-5 lg:my-10">
      <div className="container mx-auto">
        <div className="flex items-center justify-between">
          <h1 className="py-3 text-2xl font-semibold">
            <FireIcon className="me-2 inline-block h-[24px] w-[24px] text-red-500" />
            <span className="italic text-red-400">Featured</span>{' '}
            <span className="font-light">Recondition Car</span>
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
        <div className="grid grid-cols-12 gap-5">
          {newCarData.map((item, idx) => (
            <div key={idx} className="col-span-12 lg:col-span-3">
              <CardProduct data={newCarData} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ReconditionCar
