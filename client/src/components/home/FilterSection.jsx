'use client'
import React, { useState } from 'react'
import { Button, Typography } from '@material-tailwind/react'
import { BiSearchAlt } from 'react-icons/bi'
import Link from 'next/link'
import { Select } from 'antd'
const FilterSection = () => {
  const [active, setActive] = useState('new')

  const filterBy = [
    { key: 'new', title: 'New' },
    { key: 'reconditon', title: 'Reconditon' },
    { key: 'used', title: 'Used' },
  ]

  return (
    <section className="container relative z-20 mx-auto w-[90%] rounded-md bg-gray-50 p-5 shadow-lg lg:-mt-12 lg:w-3/5">
      <div className="absolute -top-8 left-0 z-10">
        <div className="flex items-center">
          {filterBy.map(({ title, key }, idx) => (
            <div
              key={key}
              onClick={() => setActive(key)}
              className={`flex-grow rounded-t-sm ${
                active === key ? 'bg-gray-50' : 'bg-gray-900 text-white'
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
              className="w-full"
              size="large"
              showSearch
              allowClear
              placeholder="Select Brand"
              optionFilterProp="children"
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              {[].map((item, idx) => (
                <Select.Option key={idx} value={item.id}>
                  {item.name}
                </Select.Option>
              ))}
            </Select>
          </div>
          <div className="flex-grow">
            <Select
              id="modelId"
              className="w-full"
              size="large"
              showSearch
              allowClear
              placeholder="Select Model"
              optionFilterProp="children"
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              {[].map((item, idx) => (
                <Select.Option key={idx} value={item.id}>
                  {item.name}
                </Select.Option>
              ))}
            </Select>
          </div>
          <div className="hidden flex-grow lg:block">
            <Button fullWidth variant="gradient">
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
