'use client'
import React, { useState } from 'react'
import { Typography, Accordion, AccordionHeader, AccordionBody } from '@material-tailwind/react'
import { ChevronDownIcon } from '@heroicons/react/24/outline'
import { getColor } from '../../dashboard/profile/utils'

const SelectColor = ({
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
        <div className="grid grid-cols-5 gap-2 px-2">
          {data.map((item, idx) => (
            <div
              title={item}
              className={`${getColor(item)} h-9 w-9 shadow-sm ${filter.includes(item) && 'border-4 shadow-xl'
                } cursor-pointer rounded-full border`}
              onClick={() => handleSelector(item)}
              key={idx}
            />
          ))}
        </div>
      </AccordionBody>
    </Accordion>
  )
}

export default SelectColor
