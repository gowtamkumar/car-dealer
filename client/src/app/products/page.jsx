'use client'
import { Suspense, useEffect, useState } from 'react'
import { IconButton, Option, Select } from '@material-tailwind/react'
import { ListBulletIcon, Squares2X2Icon } from '@heroicons/react/24/outline'
import CustomSideBar from '../../components/ui/CustomSideBar'
import CardProduct from '../../components/ui/CardProduct'
import Loading from '../loading'

const newCarData = [{}, {}, {}, {}, {}, {}, {}, {}, {}]

async function getProducts() {
  const res = await fetch('http://localhost:3900/api/v1/products')

  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }
  const data = await res.json()
  return data
}

const Products = async () => {
  const [isGrid, setIsGrid] = useState(true)
  const [products, setProducts] = useState([])

  useEffect(() => {
    ;(async () => {
      const data = await getProducts()
      // console.log('🚀 ~ data:', data.data)
      setProducts(data.data)
    })()
  }, [])

  const handleClick = (type) => {
    type === 'list' ? setIsGrid(false) : setIsGrid(true)
  }

  return (
    <section className="container mx-auto py-3">
      <div className="my-5 w-full rounded-md border bg-white px-4 shadow-sm">
        <div className="flex flex-col items-start p-4 px-5 lg:h-20 lg:flex-row lg:items-center lg:justify-between lg:p-0">
          <div className="mb-2 flex-grow">
            <h1 className="text-lg font-bold ">Searching for “mobile phone”</h1>
            <small className="mb-2 text-gray-700">48 results found</small>
          </div>
          <div className="flex items-start justify-between lg:items-center lg:gap-4">
            <div>
              <Select
                containerProps={{
                  className: 'min-w-[200px] focus:border-[1px] inline-block',
                }}
                label="Short By"
              >
                <Option>Material</Option>
                <Option>Material</Option>
                <Option>Material</Option>
                <Option>Material</Option>
                <Option>Material</Option>
              </Select>
            </div>
            <div className="flex items-center gap-2">
              {/* <span className="hidden lg:block">View :</span> */}
              <IconButton
                onClick={() => handleClick('list')}
                color={!isGrid ? 'red' : 'gray'}
                variant="text"
              >
                <ListBulletIcon className="h-[24px] w-[24px]" />
              </IconButton>
              <IconButton
                onClick={() => handleClick('grid')}
                color={isGrid ? 'red' : 'gray'}
                variant="text"
              >
                <Squares2X2Icon className="h-[24px] w-[24px]" />
              </IconButton>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-2">
        <div className="col-span-12 lg:col-span-3">
          <CustomSideBar />
        </div>
        <div className="col-span-12 px-5 lg:col-span-9">
          <Suspense fallback={<Loading />}>
            <div className="grid grid-cols-12 gap-2">
              {newCarData.map((item, idx) => (
                <div
                  key={idx}
                  className={`${isGrid ? 'col-span-12 lg:col-span-4' : 'col-span-12'}`}
                >
                  <CardProduct data={newCarData} />
                </div>
              ))}
            </div>
          </Suspense>
        </div>
      </div>
    </section>
  )
}

export default Products
