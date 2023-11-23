'use client'
import { Suspense, useEffect, useState } from 'react'
import { IconButton, Option, Select } from '@material-tailwind/react'
import { ListBulletIcon, Squares2X2Icon } from '@heroicons/react/24/outline'
import { FaCar } from "react-icons/fa6";
import CustomSideBar from '../../components/products/CustomSideBar'
import CardProduct from '../../components/ui/CardProduct'
import Loading from '../loading'
import { Gets } from '../../lib/api';

const Products = () => {
  const [isGrid, setIsGrid] = useState(true)
  const [filterData, setFilterData] = useState({})
  const [cars, setCars] = useState([])

  const handleClick = (type) => {
    type === 'list' ? setIsGrid(false) : setIsGrid(true)
  }

  useEffect(() => {
    ; (async () => {
      const params = { api: 'products' }
      const res = await Promise.resolve(Gets(params))
      setCars(res.data)
    })()

  }, [filterData])


  return (
    <section className="container mx-auto py-3">
      <div className="my-5 w-full rounded-md border bg-white px-4 shadow-sm">
        <div className="flex flex-col items-start p-4 px-5 lg:h-20 lg:flex-row lg:items-center lg:justify-between lg:p-0">
          <div className="mb-2 flex-grow">
            {filterData.search && <h1 className="text-lg font-bold ">Searching for “mobile phone”</h1>}
            <span className="mb-2 text-gray-700">48 results found</span>
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
          <CustomSideBar filterData={filterData} setFilterData={setFilterData} />
        </div>
        <div className="col-span-12 px-5 lg:col-span-9">
          <div className="grid grid-cols-12 gap-2">
            <Suspense fallback={<Loading />}>

              {cars.length > 0 ?
                cars.map((item, idx) => (
                  <div
                    key={idx}
                    className={`${isGrid ? 'col-span-12 lg:col-span-4' : 'col-span-12'}`}
                  >
                    <CardProduct data={item} />
                  </div>
                )) :
                (<div className='col-span-12'>
                  <div className='flex flex-col justify-center h-[50vh] items-center'>
                    <FaCar className='text-red-400 rounded-full my-5 p-5 bg-red-50' size={100} />
                    <h1 className='font-bold'>No Cars Found</h1>
                    <p>Please try searching for something else</p>
                  </div>
                </div>
                )}

            </Suspense>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Products
