'use client'
import React from 'react'
import { useParams } from 'next/navigation'
import { carouselData } from '../../../config'
import ProductImage from '../../../components/products/ProductImage'
import ProductDetails from '../../../components/products/ProductDetails'
import RelatedProduct from '../../../components/products/RelatedProduct'
import ProductSpacification from '../../../components/products/ProductSpacification'

const ProductId = () => {
  const params = useParams()
  console.log('~ ~ params:', params.slug.split('%20'))

  return (
    <div className="container mx-auto py-5">
      <div className="my-5 grid grid-cols-12 gap-4">
        <ProductImage data={carouselData} />
        <ProductDetails />
      </div>
      <ProductSpacification />
      <RelatedProduct />
    </div>
  )
}

export default ProductId
