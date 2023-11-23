'use client'
import React, { useState } from 'react'
import {
  Typography,
  Accordion,
  AccordionHeader,
  AccordionBody,
  Avatar
} from '@material-tailwind/react'
import { ChevronDownIcon } from '@heroicons/react/24/outline'

const SelectColor = (params) => {
  const [filter, setFilter] = useState([])

  // params
  const { label, data, filterBy, setFilterData, filterData, active, open, handleOpen } = params

  const handleSelector = (item) => {
    if (filter.includes(item)) {
      const find = filter.filter(v => v !== item)
      setFilter(find)
      setFilterData({ ...filterData, [filterBy]: find })
    } else {
      setFilter([...filter, item])
      setFilterData({ ...filterData, [filterBy]: [...filter, item] })
    }

  }

  const getColor = (color) => {
    switch (color) {

      case 'Gray':
        return `bg-gray-500`
      case 'Black':
        return `bg-black`
      case 'White':
        return `bg-white`
      case 'Pink':
        return `bg-pink-500`
      case 'Gold':
        return `bg-amber-500`
      case 'Blue':
        return `bg-blue-500`
      case 'Red':
        return `bg-red-500`
      case 'Silver':
        return `bg-blue-gray-200`
      case 'Brown':
        return `bg-brown-500`
      case 'Lime Green':
        return `bg-lime-500`
      case 'Purple':
        return `bg-purple-500`
      case 'Orange':
        return `bg-orange-500`
      case 'Yellow':
        return `bg-yellow-300`
      case 'Beige':
        return `bg-orange-50`
      case 'Dark Green':
        return `bg-green-900`
      case 'Green':
        return `bg-green-500`
      case 'Mica Blue':
        return `bg-indigo-500`
      case 'Sky Blue':
        return `bg-light-blue-300`
      case 'Dark Blue':
        return `bg-blue-900`
      case 'Navy Blue':
        return `bg-blue-600`
      case 'Red Wine':
        return `bg-pink-900`
      // 'Navy Blue',
      // 'Red Wine',
      // 'Pearl',
      // default:
      //   break;
    }
  }

  return (
    <Accordion
      open={open === active}
      className="mb-2 rounded-md border bg-white px-2 shadow-md"
      icon={
        <ChevronDownIcon
          strokeWidth={2.5}
          className={`mx-auto h-4 w-4 transition-transform ${open === active ? 'rotate-180' : ''}`}
        />

      }
    >
      <AccordionHeader
        onClick={() => handleOpen(active)}
        className="m-0 rounded-none border-b-0 px-4 py-3"
      >
        <Typography color="blue-gray" className="mr-auto block w-full font-normal">
          {label}
        </Typography>
      </AccordionHeader>

      <AccordionBody className="pt-1">
        <div className='grid grid-cols-6 gap-2 px-2'>
          {
            data.map((item, idx) => (
              <div title={item} className={`${getColor(item)} h-9 w-9 shadow-sm ${filter.includes(item) && 'border-4 shadow-xl'} border rounded-full cursor-pointer`} src='' onClick={() => handleSelector(item)} key={idx} />
            ))
          }
        </div>
      </AccordionBody>
    </Accordion>
  )
}

export default SelectColor
