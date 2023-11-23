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

const SelectItem = ({ active, label, open, data, filterBy, setFilterData, filterData, handleOpen }) => {

  const [filter, setFilter] = useState([])
  // const [open, setOpen] = useState(false)

  const handleSelector = (value, values) => {
    const newData = [...filter]
    if (!value) {
      const result = newData.filter(item => item !== (values.id || values))
      setFilter(result)
      setFilterData({ ...filterData, [filterBy]: result })
    }
    if (value) {
      setFilter([...filter, (values.id || values)])
      setFilterData({ ...filterData, [filterBy]: [...filter, (values.id || values)] })
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
        onClick={() => handleOpen(active)}
      >
        <Typography color="blue-gray" className="mr-auto font-normal w-full">
          {label}
        </Typography>
      </AccordionHeader>

      <AccordionBody className="pt-0">
        {(data || []).map((item, idx) => {
          return (
            <div key={idx} className='px-2 '>
              <Checkbox color='red' onChange={({ target }) => handleSelector(target.checked, item)} label={item.name || item} />
            </div>
          )
        })}

      </AccordionBody>
    </Accordion>
  )
}

export default SelectItem
