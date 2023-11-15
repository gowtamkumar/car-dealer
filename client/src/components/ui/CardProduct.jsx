import React from 'react'
import { Card, CardBody, CardHeader, Typography } from '@material-tailwind/react'
import CustomCarousel from './CustomCarousel'
import Link from 'next/link'
import { carouselData } from '../../config'

const CardProduct = ({ data }) => {
  return (
    <Card className="my-10 w-full border">
      <CardHeader color="blue-gray" className="relative h-56">
        <CustomCarousel
          arrow={true}
          autoPlay={false}
          view={true}
          navigation={false}
          height="h-56"
          data={carouselData}
        />
      </CardHeader>
      <Link href={`/products/${'Product Name'.toLowerCase()}`}>
        <CardBody>
          <Typography variant="small" color="blue-gray">
            Toyota
          </Typography>
          <Typography variant="h5" color="blue-gray" className="mb-1">
            UI/UX Review Check
          </Typography>
          <Typography variant="h6" color="blue-gray">
            ৳ 400.00
          </Typography>
        </CardBody>
      </Link>
    </Card>
  )
}

export default CardProduct
