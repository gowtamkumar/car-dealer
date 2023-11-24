'use client'
import React, { useEffect, useState } from 'react'
import { Get } from '../../../lib/api'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'
import SingleCar from '../../../components/products/SingleCar'


const ProductId = ({ params }) => {
  const [car, setCar] = useState()
  const router = useRouter()

  useEffect(() => {
    ; (async () => {
      if (params.slug === 'slug') {
        form.resetFields()
        setFormValues({})
        return
      }
      const param = { api: 'products', id: params.slug }
      const result = await Promise.resolve(Get(param))
      setCar(result.data)

      if (result.errorName) {
        toast.error(`Car Id Not Valid`)
        return router.push('/')
      }
    })()
  }, [params.new])

  return (
    <SingleCar data={car || []} />
  )
}

export default ProductId
