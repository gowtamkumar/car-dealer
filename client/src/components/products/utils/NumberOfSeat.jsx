'use client'
import React, { useState } from 'react'
import {
  Typography,
  Accordion,
  AccordionHeader,
  AccordionBody,
  IconButton
} from '@material-tailwind/react'
import { ChevronDownIcon } from '@heroicons/react/24/outline'

const NumberOfSeat = (params) => {
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

  // const handleClear = () => {
  //   setFilterData({ ...filterData, [filterBy]: [] })
  //   setFilter([])
  // }

  return (
    <Accordion
      open={open === active}
      className="mb-2 rounded-md border bg-white px-2 shadow-md"
      onClick={() => handleOpen(active)}
      icon={
        <div className='flex items-center gap-2'>
          {/* {open === active && <span className='text-sm text-gray-800 hover:text-red-500 transition-all ease-in-out duration-100' onClick={handleClear}>Clear</span>} */}
          <ChevronDownIcon
            strokeWidth={2.5}
            onClick={() => handleOpen(active)}
            className={`mx-auto h-4 w-4 transition-transform ${open === active ? 'rotate-180' : ''}`}
          />
        </div>
      }
    >
      <AccordionHeader

        className="m-0 rounded-none border-b-0 px-4 py-3"
      >
        <Typography color="blue-gray" className="mr-auto block w-full font-normal">
          {label}
        </Typography>
      </AccordionHeader>

      <AccordionBody className="pt-0">
        <div className='grid grid-cols-6 gap-2 px-2'>
          {
            data.map((item, idx) => (
              <IconButton onClick={() => handleSelector(item)} key={idx} variant='text' color='blue' className={`${filter.includes(item) && 'border-4'} `}>{item}</IconButton>
            ))
          }
        </div>
      </AccordionBody>
    </Accordion>
  )
}

export default NumberOfSeat
