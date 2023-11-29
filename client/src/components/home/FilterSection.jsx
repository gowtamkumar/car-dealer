'use client'
import React, { useEffect, useState } from 'react'
import { Button, Typography } from '@material-tailwind/react'
import { BiSearchAlt } from 'react-icons/bi'
import Link from 'next/link'
import { Select } from 'antd'
import { Gets } from '../../lib/api'
import { useRouter } from 'next/navigation'

const FilterSection = () => {
  const [active, setActive] = useState({ condition: 'New' })
  const [apiData, setApiData] = useState({})

  const router = useRouter()

  useEffect(() => {
    ; (async () => {
      const brands = await Promise.resolve(Gets({ api: 'brands' }))
      const models = await Promise.resolve(Gets({ api: 'models' }))
      setApiData({
        ...apiData,
        models: models?.data,
        brands: brands?.data,
      })
    })()
  }, [])

  const filterBy = [
    { key: 'new', title: 'New' },
    { key: 'reconditon', title: 'Reconditon' },
    { key: 'used', title: 'Used' },
  ]

  const handleChange = (key, type) => {
    setActive({ ...active, [type]: key })
  }

  const handleFilter = () => {
    const { brandId, modelId, condition } = active

    let queryString = '';
    if (condition) {
      queryString += `condition=${condition}${condition && '&'}`
    }
    if (brandId) {
      queryString += `brandId=${brandId}${brandId && '&'}`
    }
    if (modelId) {
      queryString += `modelId=${modelId}${modelId && '&'}`
    }
    router.push(`/products?${queryString}`)
  }


  return (
    <section className="container relative z-20 mx-auto w-[90%] rounded-md bg-gray-50 p-5 shadow-lg lg:-mt-12 lg:w-3/5">
      <div className="absolute -top-8 left-0 z-10">
        <div className="flex items-center">
          {filterBy.map(({ title, key }, idx) => (
            <div
              key={key}
              onClick={() => handleChange(title, 'condition')}
              className={`flex-grow rounded-t-sm ${active?.condition === title ? 'bg-gray-50' : 'bg-gray-900 text-white'
                } cursor-pointer px-8 py-2 text-center text-sm font-bold transition-all duration-150 ease-linear`}
            >
              {title}
            </div>
          ))}
        </div>
      </div>
      <div>
        <div className="flex flex-col items-center justify-between lg:flex-row">
          <h1 className="font-karol-sans flex-grow text-lg font-semibold lg:text-3xl">
            Find your <span className="font-gill-sans-nova italic text-red-400">Perfect</span> car
          </h1>
          <Typography
            as={Link}
            href="/products"
            variant="small"
            color="blue-gray"
            className="group/item cursor-pointer font-normal hover:underline"
          >
            <BiSearchAlt className="inline-block transition-all duration-150 ease-linear group-hover/item:-translate-x-2" />
            <span>Advanced Search</span>
          </Typography>
        </div>

        <div className="my-5 flex h-20 flex-row items-center justify-between gap-3 rounded-md border p-3">
          <div className="flex-grow">
            <Select
              id="brandId"
              showSearch
              allowClear
              className="w-full"
              onChange={(e) => handleChange(e, 'brandId')}
              size="large"
              placeholder="Select Brand"
              optionFilterProp="children"
              filterOption={(inputValue, option) =>
                option.children?.toLowerCase().indexOf(inputValue.toLowerCase()) >= 0
              }
            >
              {(apiData.brands || []).map((item, idx) => (
                <Select.Option key={idx} value={item.id}>
                  {item.name}
                </Select.Option>
              ))}
            </Select>
          </div>
          <div className="flex-grow">
            <Select
              showSearch
              allowClear
              size='large'
              className='w-full'
              onChange={(e) => handleChange(e, 'modelId')}
              placeholder="Select Model"
              optionFilterProp="children"
              filterOption={(inputValue, option) =>
                option?.children?.toLowerCase().indexOf(inputValue.toLowerCase()) >= 0
              }
            >
              {(apiData.models || [])
                // .filter((item) => item.brandId === formValues.brandId)
                .map((item, idx) => {
                  return (
                    <Select.Option key={idx} value={item.id}>
                      {item.name}
                    </Select.Option>
                  )
                })}
            </Select>
          </div>
          <div className="hidden flex-grow lg:block">
            <Button onClick={handleFilter} fullWidth variant="gradient">
              Search
            </Button>
          </div>
        </div>
        <Button className="block lg:hidden" fullWidth variant="gradient">
          Search
        </Button>
      </div>
    </section>
  )
}

export default FilterSection
