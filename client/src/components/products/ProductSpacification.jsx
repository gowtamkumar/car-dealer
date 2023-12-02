import React from 'react'
import productEnum from '../../constants/utils'

const ProductSpacification = ({ data }) => {
  // const inc = data?.productFeature.includes()

  return (
    <div className="my-5 grid grid-cols-12 gap-4">
      <div className="col-span-12 py-2">
        <h1 className="px-3 text-2xl font-semibold lg:px-0">Car Details</h1>
        <div className="my-5 grid grid-cols-12 gap-4">
          <div className="col-span-12 rounded border p-4 transition-all duration-200 ease-linear hover:shadow-md lg:col-span-3">
            <div>
              <h1 className="border-b text-2xl font-bold text-gray-700">Basic Info.</h1>
              <ul className="my-3">
                <li className="text-md flex items-center justify-between">
                  <span className="w-2/5 font-medium text-gray-900/90">Make</span>
                  <span className="w-3/5 text-gray-800/80">: {data.brand?.name}</span>
                </li>
                <li className="text-md flex items-center justify-between">
                  <span className="w-2/5 font-medium text-gray-900/90">Model</span>
                  <span className="w-3/5 text-gray-800/80">: {data.model?.name}</span>
                </li>
                <li className="text-md flex items-center justify-between">
                  <span className="w-2/5 font-medium text-gray-900/90">Model Code</span>
                  <span className="w-3/5 text-gray-800/80">: {data.modelCode?.name}</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-span-12 rounded border p-4 transition-all duration-200 ease-linear hover:shadow-md lg:col-span-3">
            <div>
              <h1 className="border-b text-2xl font-bold text-gray-700">Engine</h1>
              <ul className="my-3">
                <li className="text-md flex items-center justify-between">
                  <span className="w-3/5 font-medium text-gray-900/90">Engine Cc</span>
                  <span className="w-3/5 text-gray-800/80">: {data.engCc}</span>
                </li>
                <li className="text-md flex items-center justify-between">
                  <span className="w-3/5 font-medium text-gray-900/90">Engine Code</span>
                  <span className="w-3/5 text-gray-800/80">: {data.engCc}</span>
                </li>
                <li className="text-md flex items-center justify-between">
                  <span className="w-3/5 font-medium text-gray-900/90">Milleage</span>
                  <span className="w-3/5 text-gray-800/80">: {data.milleage}</span>
                </li>
                <li className="text-md flex items-center justify-between">
                  <span className="w-3/5 font-medium text-gray-900/90">Load Capacity</span>
                  <span className="w-3/5 text-gray-800/80">: {data.loadCapacity}</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-span-12 rounded border p-4 transition-all duration-200 ease-linear hover:shadow-md lg:col-span-3">
            <div>
              <h1 className="border-b text-2xl font-bold text-gray-700">Transmission</h1>
              <ul className="my-3">
                <li className="text-md flex items-center justify-between">
                  <span className="w-2/5 font-medium text-gray-900/90">Body Type</span>
                  <span className="w-3/5 text-gray-800/80">: {data.bodyType}</span>
                </li>
                <li className="text-md flex items-center justify-between">
                  <span className="w-2/5 font-medium text-gray-900/90">Drivetrain</span>
                  <span className="w-3/5 text-gray-800/80">: {data.drivetrain}</span>
                </li>
                <li className="text-md flex items-center justify-between">
                  <span className="w-2/5 font-medium text-gray-900/90">Transmission</span>
                  <span className="w-3/5 text-gray-800/80">: {data.transmission}</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-span-12 rounded border p-4 transition-all duration-200 ease-linear hover:shadow-md lg:col-span-3">
            <div>
              <h1 className="border-b text-2xl font-bold text-gray-700">Exterior</h1>
              <ul className="my-3">
                <li className="text-md flex items-center justify-between">
                  <span className="w-2/5 font-medium text-gray-900/90">Passenger</span>
                  <span className="w-3/5 text-gray-800/80">: {data.noOfPass}</span>
                </li>
                <li className="text-md flex items-center justify-between">
                  <span className="w-2/5 font-medium text-gray-900/90">Seats</span>
                  <span className="w-3/5 text-gray-800/80">: {data.noOfseat}</span>
                </li>
                <li className="text-md flex items-center justify-between">
                  <span className="w-2/5 font-medium text-gray-900/90">Steering</span>
                  <span className="w-3/5 text-gray-800/80">: {data.steering}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="col-span-12 py-2">
        <h1 className="px-3 text-2xl font-semibold lg:px-0">Car Features</h1>
        <div className="my-3 grid grid-cols-6 gap-3 px-3 lg:px-0">
          {productEnum.features.map((item, idx) => (
            <div
              key={idx}
              className="flex items-center gap-2 rounded-md border px-3 py-1 text-gray-800/90"
            >
              {(data?.productFeature || []).includes(item.value) ? (
                <img src="/svg/check.svg" className="h-[20px] w-[20px]" alt="" />
              ) : (
                <img src="/svg/close.svg" className="h-[20px] w-[20px]" alt="" />
              )}
              <span>{item.label}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="col-span-12 p-2">
        <h1 className="px-3 text-2xl font-semibold lg:px-0">Description</h1>

        <p className="my-3 w-full text-gray-800/90 lg:w-4/5">{data.description}</p>
      </div>
    </div>
  )
}

export default ProductSpacification
