'use client'
import React, { useEffect, useState } from 'react'
import { Typography } from '@material-tailwind/react'
import { InputNumber, Slider } from 'antd'

const PriceRange = ({ filterData, setFilterData }) => {
  const [range, setRange] = useState({ minPrice: 0, maxPrice: 99999 })

  const handleChange = (value, type) => {
    if (type === 'minPrice') {
      setRange({ ...range, minPrice: value })
    }
    if (type === 'maxPrice') {
      setRange({ ...range, maxPrice: value })
    }
    if (type === 'slider') {
      setRange({ minPrice: value[0], maxPrice: value[1] })
    }
  }

  useEffect(() => {
    setFilterData({ ...filterData, minPrice: range.minPrice, maxPrice: range.maxPrice })
  }, [range])


  return (
    <div className="mb-2 rounded-md border bg-white p-4 shadow-md">
      <Typography color="blue-gray" variant="h5" className="mr-auto font-normal">
        Price Range
      </Typography>

      <div className="px-5">
        <Slider
          max={99999999}
          onChange={(e) => handleChange(e, 'slider')}
          range
          defaultValue={[range.minPrice, range.maxPrice]}
          value={[range.minPrice, range.maxPrice]}
        />
      </div>
      <div className="flex items-center justify-between px-5 py-2">
        <InputNumber
          onChange={(e) => handleChange(e, 'minPrice')}
          min={0}
          width={20}
          value={range?.minPrice}
          placeholder="Min Amount"
        />
        <InputNumber
          onChange={(e) => handleChange(e, 'maxPrice')}
          min={0}
          width={20}
          value={range?.maxPrice}
          placeholder="Max Amount"
        />
      </div>
    </div>
  )
}

export default PriceRange
