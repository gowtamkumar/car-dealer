import React, { Suspense } from 'react'
import Loading from '../../../loading'

const AddProduct = ({ children }) => {
  return <Suspense fallback={<Loading />}>{children}</Suspense>
}

export default AddProduct
