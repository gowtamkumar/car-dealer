'use client'
import { Option, Select } from '@material-tailwind/react'
import React from 'react'

const AddProduct = () => {
  return (
    <section>
      <div className="grid grid-cols-12 gap-3">
        <div className="col-span-12 mb-2 border-b">
          <code className="py-3 text-2xl font-semibold italic text-pink-400">Product Info.</code>
        </div>
        <div className="col-span-12 mb-2 lg:col-span-3">
          <Select
            error={false}
            onChange={(value) => console.log('condition', value)}
            variant="standard"
            label="Conditions *"
          >
            <Option value="new">New</Option>
            <Option value="used">Used</Option>
            <Option value="recondition">Recondition</Option>
          </Select>
        </div>
        <div className="col-span-12 mb-2 lg:col-span-3">
          <Select
            error={false}
            onChange={(value) => console.log('brandId', value)}
            variant="standard"
            label="Brands *"
          >
            <Option value="new">New</Option>
            <Option value="used">Used</Option>
            <Option value="recondition">Recondition</Option>
          </Select>
        </div>
        <div className="col-span-12 mb-2 lg:col-span-3">
          <Select
            error={false}
            onChange={(value) => console.log('modelId', value)}
            variant="standard"
            label="Model *"
          >
            <Option value="new">New</Option>
            <Option value="used">Used</Option>
            <Option value="recondition">Recondition</Option>
          </Select>
        </div>
        <div className="col-span-12 mb-2 lg:col-span-3">
          <Select
            error={false}
            onChange={(value) => console.log('modelId', value)}
            variant="standard"
            label="Model Code *"
          >
            <Option value="new">New</Option>
            <Option value="used">Used</Option>
            <Option value="recondition">Recondition</Option>
          </Select>
        </div>
      </div>
    </section>
  )
}

export default AddProduct
