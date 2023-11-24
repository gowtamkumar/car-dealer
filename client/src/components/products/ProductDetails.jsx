import React from 'react'
import { BsFuelPumpDiesel, BsSpeedometer2 } from 'react-icons/bs'
import { AiOutlineBgColors, AiOutlineCar } from 'react-icons/ai'
import { Button } from '@material-tailwind/react'
import dayjs from 'dayjs'

const ProductDetails = ({ data }) => {

  const carName = `${dayjs(data.manufactureDate).format('YYYY')} ${data.name} ${data.brand?.name} ${data.model?.name}`

  return (
    <div className="col-span-12 rounded-md px-5 lg:col-span-7">
      <h1 className="text-2xl font-semibold">{carName}</h1>
      <div className="my-3 flex items-center justify-between gap-4 lg:w-3/5">
        <h1 className="font-bold text-red-400">
          Registration : <span className="text-gray-700">{dayjs(data.registrationDate).format('YYYY')}</span>
        </h1>
        <h1 className="font-bold text-red-400">
          Category : <span className="text-gray-700">{data?.condition}</span>
        </h1>
        {/* <h1 className="font-bold text-red-400">
          Views : <span className="text-gray-700">400</span>
        </h1> */}
      </div>
      <h1 className="my-5 text-4xl text-gray-900/80">৳ {data.price}</h1>
      <div className="my-5 flex flex-wrap items-start justify-between gap-4 lg:w-4/5">
        <div className="flex flex-grow flex-col items-center">
          <BsSpeedometer2 className="text-6xl text-gray-500/50" />
          <h1 className="mt-2 text-gray-800/80">Mileage</h1>
          <p className="font-bold text-gray-800">{data.milleage}</p>
        </div>
        <div className="flex flex-grow flex-col items-center">
          <BsFuelPumpDiesel className="text-6xl text-red-500/50" />
          <h1 className="mt-2 text-gray-800/80">Fuel Type</h1>
          <p className="font-bold text-gray-800">{data.fuelType}</p>
        </div>
        <div className="flex flex-grow flex-col items-center">
          <AiOutlineCar className="text-6xl text-orange-400/50" />
          <h1 className="mt-2 text-gray-800/80">Condition</h1>
          <p className="font-bold text-gray-800">{data.condition}</p>
        </div>
        <div className="flex flex-grow flex-col items-center">
          <AiOutlineBgColors className="text-6xl text-green-500/50" />
          <h1 className="mt-2 text-gray-800/80">Exterior Colour</h1>
          <p className="font-bold text-gray-800">{data.color}</p>
        </div>
      </div>
      <div className="rounded-md border bg-red-500/10 p-10 shadow-sm">
        <Button variant="gradient" color="red" fullWidth className="capitalize">
          Call For Final Price
        </Button>
      </div>
    </div>
  )
}

export default ProductDetails
