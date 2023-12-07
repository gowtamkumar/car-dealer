'use client'
import React, { useState } from 'react'
import {
  Typography,
  Accordion,
  AccordionHeader,
  AccordionBody,
  Checkbox,
} from '@material-tailwind/react'
import { ChevronDownIcon } from '@heroicons/react/24/outline'

const Features = ({
  active,
  label,
  open,
  data,
  filterBy,
  setFilterData,
  filterData,
  handleOpen,
}) => {
  const [filter, setFilter] = useState([])

  const handleSelector = (value, values) => {
    const newData = [...filter]

    if (!value) {
      const result = newData.filter((item) => item !== values.value)
      console.log("result:", result)
      setFilter(result)
      setFilterData({ ...filterData, [filterBy]: result })
    }
    if (value) {
      setFilter([...filter, values.value || values])
      setFilterData({ ...filterData, [filterBy]: [...filter, values.value] })
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
            className={`mx-auto h-4 w-4 transition-transform ${open === active ? 'rotate-180' : ''
              }`}
          />
        </div>
      }
    >
      <AccordionHeader
        className="m-0 rounded-none border-b-0 px-4 py-3"
        onClick={() => handleOpen(active)}
      >
        <Typography color="blue-gray" className="mr-auto w-full font-normal">
          {label}
        </Typography>
      </AccordionHeader>

      <AccordionBody className="mb-5 h-[40vh] overflow-auto pt-2">
        {(data || []).map((item, idx) => {
          return (
            <div key={idx} className="px-2">
              <Checkbox
                color="red"
                onChange={({ target }) => handleSelector(target.checked, item)}
                label={item.label || item}
                className="inline-block"
              />
            </div>
          )
        })}
      </AccordionBody>
    </Accordion>
  )
}

export default Features
