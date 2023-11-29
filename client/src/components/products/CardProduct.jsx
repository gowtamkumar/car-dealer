import React from 'react'
import { Card, CardBody, Typography } from '@material-tailwind/react'
import CustomCarousel from '../ui/CustomCarousel'
import Link from 'next/link'
import { BsFillCalendar2MinusFill, BsFillFuelPumpFill, BsSpeedometer2 } from 'react-icons/bs'
import { IoColorPaletteOutline } from 'react-icons/io5'
import dayjs from 'dayjs'

const CardProduct = ({ data }) => {
  const carName = `${dayjs(data.manufactureDate).format('YYYY')} ${data.name} ${data.brand?.name} ${data.model?.name}`


  return (
    <Card className="relative mb-5 w-full border">
      <div className="overflow-hidden rounded-md">
        <CustomCarousel
          arrow={false}
          autoPlay={false}
          view={true}
          navigation={false}
          height="h-56"
          data={data?.photos || []}
        />
      </div>
      <Link href={`/products/${data.id}`}>
        <CardBody className="px-4 py-2">
          <div>
            <Typography variant="small" color="blue-gray">
              <span>{data?.brand?.name}</span>
              <span title='condition' className='absolute top-2 right-2 text-white rounded-md bg-indigo-400 px-2 py-1'>{data?.condition}</span>
            </Typography>
            <Typography variant="h5" className="my-1 font-extralight text-gray-900 truncate">
              {carName}
            </Typography>
            <Typography variant="h6" color="blue-gray">
              ৳ {data?.price}
            </Typography>
          </div>
          <div className="my-2 flex max-w-[400px] items-center justify-around">
            <div title='Milleage' className="flex flex-col items-center">
              <BsSpeedometer2 />
              <small>{data?.milleage}</small>
            </div>
            <div title='Fuel Type' className="flex flex-col items-center">
              <BsFillFuelPumpFill />
              <small>{data?.fuelType}</small>
            </div>
            <div title='Registration' className="flex flex-col items-center">
              <BsFillCalendar2MinusFill />
              <small>{dayjs(data.registrationDate).format('YYYY')}</small>
            </div>
            <div title='Color' className="flex flex-col items-center">
              <IoColorPaletteOutline />
              <small>{data.color}</small>
            </div>
          </div>
        </CardBody>
      </Link>
    </Card>
  )
}

export default CardProduct
