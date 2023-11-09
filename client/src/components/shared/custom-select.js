import React from 'react'
import Select from 'react-select'

const CustomSelect = ({ options, value, onChange, placeholder }) => {
  return (
    <Select
      options={options}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      isSearchable
      className="w-full rounded-md border-2 border-gray-300 p-2 focus:border-indigo-500 focus:outline-none"
    />
  )
}

export default CustomSelect
