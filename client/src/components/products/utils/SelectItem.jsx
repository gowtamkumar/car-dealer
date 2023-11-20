'use client'
import React, { useState } from 'react'
import {
  Typography,
  List,
  ListItem,
  Accordion,
  AccordionHeader,
  AccordionBody,
} from '@material-tailwind/react'
import { ChevronDownIcon } from '@heroicons/react/24/outline'

const SelectItem = (params) => {
  const { label, data, filterBy, handleChange } = params

  const [open, setOpen] = useState(true)

  return (
    <Accordion
      open={open}
      className="mb-2 rounded-md border bg-white px-2 shadow-md"
      icon={
        <ChevronDownIcon
          strokeWidth={2.5}
          className={`mx-auto h-4 w-4 transition-transform ${open ? 'rotate-180' : ''}`}
        />
      }
    >
      <AccordionHeader
        onClick={() => setOpen(!open)}
        className="m-0 rounded-none border-b-0 px-4 py-3"
      >
        <Typography color="blue-gray" className="mr-auto font-normal">
          {label}
        </Typography>
      </AccordionHeader>

      <AccordionBody>
        <List className="m-0 p-0">
          {(data || []).map((item, idx) => (
            <ListItem
              key={idx}
              onClick={() => handleChange(filterBy, item)}
              className="rounded-none px-3 py-2"
            >
              {item.name}
            </ListItem>
          ))}
        </List>
      </AccordionBody>
    </Accordion>
  )
}

export default SelectItem
