'use client'
import React, { useEffect, useState } from 'react'
import { Gets } from '../../lib/api'
import productEnum from '../../constants/utils'
import SelectItem from './utils/SelectItem'
import PriceRange from './utils/PriceRange'
import SelectColor from './utils/SelectColor'
import Features from './utils/Features'

export default function CustomSideBar({ filterData, setFilterData }) {
  const [apiData, setApiData] = useState({})
  const [open, setOpen] = useState(0)

  useEffect(() => {
    ; (async () => {
      try {
        const brands = await Gets({ api: 'brands' })
        const models = await Gets({ api: 'models' })
        const modelCodes = await Gets({ api: 'model-codes' })
        setApiData({
          ...apiData,
          models: models.data,
          modelCodes: modelCodes.data,
          brands: brands.data,
        })
      } catch (error) {
        console.log(error)
      }
    })()
  }, [])

  const handleOpen = (value) => {
    setOpen(open === value ? null : value)
  }

  return (
    <>
      <PriceRange filterData={filterData} setFilterData={setFilterData} />
      <SelectItem
        active={0}
        open={open}
        handleOpen={handleOpen}
        filterBy="brandId"
        label="Brand"
        data={apiData.brands}
        setFilterData={setFilterData}
        filterData={filterData}
      />
      <SelectItem
        active={1}
        open={open}
        handleOpen={handleOpen}
        filterBy="transmission"
        label="Transmission"
        data={productEnum.transmission}
        setFilterData={setFilterData}
        filterData={filterData}
      />
      <SelectItem
        active={2}
        open={open}
        handleOpen={handleOpen}
        filterBy="fuelType"
        label="Fuel Type"
        data={productEnum.fuelType}
        setFilterData={setFilterData}
        filterData={filterData}
      />
      <SelectItem
        active={3}
        open={open}
        handleOpen={handleOpen}
        filterBy="noOfseat"
        label="No Of Seat"
        data={productEnum.numberOfSeat}
        setFilterData={setFilterData}
        filterData={filterData}
      />
      <Features
        active={4}
        open={open}
        handleOpen={handleOpen}
        filterBy="productFeature"
        label="Features"
        data={productEnum.features}
        setFilterData={setFilterData}
        filterData={filterData}
      />
      <SelectColor
        active={5}
        open={open}
        handleOpen={handleOpen}
        filterBy="color"
        label="Color"
        data={productEnum.color}
        setFilterData={setFilterData}
        filterData={filterData}
      />
    </>
  )
}
