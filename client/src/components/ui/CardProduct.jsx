import React from 'react'
import { Card, CardBody, CardHeader, Typography } from '@material-tailwind/react'
import CustomCarousel from './CustomCarousel'
import Link from 'next/link'
import { carouselData } from '../../config'
import { BsFillCalendar2MinusFill, BsFillFuelPumpFill, BsSpeedometer2 } from 'react-icons/bs'
import { IoColorPaletteOutline } from 'react-icons/io5'

const CardProduct = ({ data }) => {
  return (
    <Card className="mb-5 w-full border">
      {/* <CardHeader floated={false} color="blue-gray">
      </CardHeader> */}
      <div className="overflow-hidden rounded-md">
        <CustomCarousel
          arrow={true}
          autoPlay={false}
          view={true}
          navigation={false}
          height="h-56"
          data={carouselData}
        />
      </div>
      <Link href={`/products/${'Product Name'.toLowerCase()}`}>
        <CardBody className="px-4 py-2">
          <div>
            <Typography variant="small" color="blue-gray">
              Toyota
            </Typography>
            <Typography variant="h5" color="blue-gray" className="mb-1">
              UI/UX Review Check
            </Typography>
            <Typography variant="h6" color="blue-gray">
              ৳ 400.00
            </Typography>
          </div>
          <div className="my-2 flex max-w-[400px] items-center justify-around">
            <div className="flex flex-col items-center">
              <BsSpeedometer2 />
              <small>3050</small>
            </div>
            <div className="flex flex-col items-center">
              <BsFillFuelPumpFill />
              <small>Octen</small>
            </div>
            <div className="flex flex-col items-center">
              <BsFillCalendar2MinusFill />
              <small>2018</small>
            </div>
            <div className="flex flex-col items-center">
              <IoColorPaletteOutline />
              <small>Black</small>
            </div>
          </div>
        </CardBody>
      </Link>
    </Card>
  )
}

export default CardProduct
