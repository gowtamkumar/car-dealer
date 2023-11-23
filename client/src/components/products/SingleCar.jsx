import React from 'react'
import CustomCarousel from '../ui/CustomCarousel'
import ProductDetails from './ProductDetails'
import ProductSpacification from './ProductSpacification'

const SingleCar = ({ data }) => {
  return (
    <div className="container mx-auto">
      <div className="my-5 grid grid-cols-12 gap-4">
        <div className="col-span-12 p-5 lg:col-span-5 lg:p-0">
          <CustomCarousel
            arrow={true}
            autoPlay={true}
            view={true}
            navigation={false}
            height="h-96"
            data={data?.photos || []}
          />
        </div>
        <ProductDetails data={data} />
      </div>
      <ProductSpacification data={data} />
    </div>
  )
}

export default SingleCar