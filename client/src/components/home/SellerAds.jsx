'use client'
import React from 'react'
import { Button } from '@material-tailwind/react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

const SellerAds = () => {
  const session = useSession()
  const router = useRouter()

  const handleClick = () => {
    if (session.status === 'unauthenticated') {
      router.replace('/login')
    } else {
      router.replace('/dashboard/add-product/new')
    }
  }

  return (
    <section className="my-5 bg-red-50/5 lg:mt-10">
      <div className="container mx-auto px-5">
        <div className="grid min-h-[40vh] grid-cols-12 items-center gap-5">
          <div className="col-span-12 lg:col-span-6 ">
            <h1 className="text-4xl font-bold">Sell your car</h1>
            <p className="my-3 text-xl font-medium">
              Easily create an advert for your car and reach millions of potential buyers per month
            </p>
            <Button variant="gradient" onClick={handleClick}>
              Get Started
            </Button>
          </div>
          <div className="col-span-12 overflow-hidden  lg:col-span-6">
            <div className="flex h-[40vh] w-auto items-center rounded-full bg-red-300/5 ">
              <img src="/car.png" className="h-auto w-full" alt="" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default SellerAds
