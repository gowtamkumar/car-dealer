'use client'
import React, { useEffect, useState } from 'react'
import { Gets } from '../../lib/api'
import SelectItem from './utils/SelectItem'
import PriceRange from './utils/PriceRange'

export default function CustomSideBar() {
  const [open, setOpen] = React.useState(null)
  const [apiData, setApiData] = useState({})
  const [filterData, setFilterData] = useState({})

  useEffect(() => {
    ;(async () => {
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

  const handleChange = (type, value) => {
    setFilterData({ ...filterData, [type]: value.id })
    // setOpen(open + 1)
  }

  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value)
  }

  return (
    <>
      <PriceRange />
      <SelectItem
        active={0}
        filterBy="brandId"
        open={open}
        label="Brand"
        data={apiData.brands}
        handleOpen={handleOpen}
        handleChange={handleChange}
      />
      {filterData.brandId && (
        <SelectItem
          active={1}
          open={open}
          label="Model"
          filterBy="modelId"
          data={apiData.models}
          handleOpen={handleOpen}
          handleChange={handleChange}
        />
      )}

      {filterData.modelId && (
        <SelectItem
          active={2}
          open={open}
          label="Model Code"
          filterBy="modelCodeId"
          handleOpen={handleOpen}
          data={apiData.modelCodes}
          handleChange={handleChange}
        />
      )}
    </>
  )
}
