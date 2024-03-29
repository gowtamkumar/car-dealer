'use client'
import { Suspense, useEffect, useState } from 'react'
import { IconButton } from '@material-tailwind/react'
import { ListBulletIcon, Squares2X2Icon } from '@heroicons/react/24/outline'
import { FaCar } from 'react-icons/fa6'
import CustomSideBar from '../../components/products/CustomSideBar'
import CardProduct from '../../components/products/CardProduct'
import Loading from '../loading'
import { GetProducts } from '../../lib/api'
import { useRouter, useSearchParams } from 'next/navigation'
import { Select, Pagination } from 'antd'

const Products = () => {
  const [isGrid, setIsGrid] = useState(true)
  const [filterData, setFilterData] = useState({})
  const [cars, setCars] = useState([])

  // ! Query
  const searchParams = useSearchParams()
  const router = useRouter()
  const currentPage = parseInt(searchParams.get('page')) || 1

  const handlePageChange = (page) => {
    router.push(`/products?page=${page}`)
  }

  useEffect(() => {
    const search = searchParams.get('search')
    const brandId = searchParams.get('brandId')
    const modelId = searchParams.get('modelId')
    const condition = searchParams.get('condition')

    if (condition || brandId || modelId) {
      setFilterData({ ...filterData, condition: condition, brandId: [brandId], modelId: [modelId] })
    }

    if (search) setFilterData({ ...filterData, search })
  }, [searchParams])

  useEffect(() => {
    ; (async () => {
      const params = { api: 'products', data: filterData }
      const res = await Promise.resolve(GetProducts(params))
      setCars(res?.data)
    })()
  }, [filterData, searchParams])

  const handleClick = (type) => {
    type === 'list' ? setIsGrid(false) : setIsGrid(true)
  }

  const handleShortBy = (value) => {
    if (value) {
      setFilterData({ ...filterData, highPrice: true, lowPrice: false })
    }
    if (!value) {
      setFilterData({ ...filterData, lowPrice: true, highPrice: false })
    }
  }

  return (
    <section className="container mx-auto py-3">
      <div className="my-5 w-full rounded-md border bg-white px-4 shadow-sm">
        <div className="flex flex-col items-start p-4 px-5 lg:h-20 lg:flex-row lg:items-center lg:justify-between lg:p-0">
          <div className="mb-2 flex-grow">
            {filterData.search && (
              <h1 className="text-lg font-bold ">Searching for “{filterData.search}”</h1>
            )}
            {cars?.length > 0 && (
              <span className="mb-2 text-gray-700">{cars.length} cars found</span>
            )}
          </div>
          <div className="flex items-start justify-between lg:items-center lg:gap-4">
            <div>
              <Select onChange={handleShortBy} className="w-full" placeholder="Short By Price">
                <Select.Option value={false}>Low To High</Select.Option>
                <Select.Option value={true}>High To Low</Select.Option>
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
              {cars?.length > 0 ? (
                (cars || [])
                  .filter((item) => item.status === 'Approved')
                  .map((item, idx) => (
                    <div
                      key={idx}
                      className={`${isGrid ? 'col-span-12 lg:col-span-4' : 'col-span-12'}`}
                    >
                      <CardProduct data={item} />
                    </div>
                  ))
              ) : (
                <div className="col-span-12">
                  <div className="flex h-[50vh] flex-col items-center justify-center">
                    <FaCar className="my-5 rounded-md bg-red-50 p-5 text-red-400" size={100} />
                    <h1 className="font-bold">No Cars Found</h1>
                    <p>Please try searching for something else</p>
                  </div>
                </div>
              )}
              {cars?.length > 10 && (
                <div className="col-span-12">
                  <Pagination
                    current={currentPage}
                    onChange={handlePageChange}
                    total={100} // Replace this with the total number of pages or items
                  />
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
