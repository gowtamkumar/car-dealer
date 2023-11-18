/* eslint-disable @next/next/no-img-element */
'use client'
import { Button, Typography } from '@material-tailwind/react'
import { BsHandbag } from 'react-icons/bs'
import ProductItem from '../products/ProductItem'
import { useEffect, useState } from 'react'

const WishList = ({ theme, wishList }) => {
  return (
    <div>
      <div className="flex justify-between border-b py-3">
        <Typography variant="h6" color="blue-gray" className="m-0 flex flex-row items-center gap-3">
          <BsHandbag className="text-xl" /> My WishList
        </Typography>
        <Button variant="outlined" size="sm" color={theme} className="capitalize">
          Add All To Cart
        </Button>
      </div>
      <div className="my-5 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-5">
        {wishList.length > 0 ? (
          wishList
            .filter((item) => item.isFavourite)
            .map((item) => <ProductItem key={item.id} data={item} />)
        ) : (
          <div className="col-span-full flex h-64 flex-row items-center justify-center">
            <div className="text-center">
              <img
                src="/assets/svgs/empty-folder.svg"
                className="h-36 w-36 object-fill"
                alt="empty"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default WishList
