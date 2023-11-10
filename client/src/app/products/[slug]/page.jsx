'use client'
import React from 'react'
import { useParams } from 'next/navigation'

const ProductId = () => {
  const params = useParams()

  console.log('~ ~ params:', params.slug.split('%20'))
  return <div>ProductId</div>
}

export default ProductId
