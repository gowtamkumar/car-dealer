'use client'
import React, { useState } from 'react'
import { Typography, Accordion, AccordionHeader, AccordionBody } from '@material-tailwind/react'
import { ChevronDownIcon } from '@heroicons/react/24/outline'

const NumberOfSeat = ({
  label,
  data,
  filterBy,
  setFilterData,
  filterData,
  active,
  open,
  handleOpen,
}) => {
  const [filter, setFilter] = useState([])

  const handleSelector = (item) => {
    if (filter.includes(item)) {
      const find = filter.filter((v) => v !== item)
      setFilter(find)
      setFilterData({ ...filterData, [filterBy]: find })
    } else {
      setFilter([...filter, item])
      setFilterData({ ...filterData, [filterBy]: [...filter, item] })
    }
  }

  return (
    <Accordion
      open={open === active}
      className="mb-2 rounded-md border bg-white px-2 shadow-md"
      icon={
        <div className="flex items-center gap-2">
          <ChevronDownIcon
            strokeWidth={2.5}
            onClick={() => handleOpen(active)}
            className={`mx-auto h-4 w-4 transition-transform ${
              open === active ? 'rotate-180' : ''
            }`}
          />
        </div>
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

      <AccordionBody className="pt-0">
        <div className="grid grid-cols-6 gap-2 px-2">
          {data.map((item, idx) => (
            <div
              key={idx}
              onClick={() => handleSelector(item)}
              className={`${
                filter.includes(item) && 'border-4'
              } flex h-9 w-9 cursor-pointer items-center justify-center rounded-full hover:bg-gray-200`}
            >
              {item}
            </div>
          ))}
        </div>
      </AccordionBody>
    </Accordion>
  )
}

export default NumberOfSeat
