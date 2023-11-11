import React from 'react'

const ProductSpacification = () => {
  return (
    <div className="my-5 grid grid-cols-12 gap-4">
      <div className="col-span-12 py-2">
        <h1 className="px-3 text-2xl font-semibold lg:px-0">Car Details</h1>
        <div className="my-5 grid grid-cols-12 gap-4">
          <div className="col-span-12 rounded border p-4 transition-all duration-200 ease-linear hover:shadow-md lg:col-span-3">
            <div>
              <h1 className="border-b text-2xl font-bold text-gray-700">Engine</h1>
              <ul className="my-3">
                <li className="text-md flex items-center justify-between">
                  <span className="w-2/5 text-gray-900/90">Layout</span>
                  <span className="w-3/5 text-gray-800/80">: Front Engined</span>
                </li>
                <li className="text-md flex items-center justify-between">
                  <span className="w-2/5 text-gray-900/90">Size</span>
                  <span className="w-3/5 text-gray-800/80">: 6.2L</span>
                </li>
                <li className="text-md flex items-center justify-between">
                  <span className="w-2/5 text-gray-900/90">Aspiration</span>
                  <span className="w-3/5 text-gray-800/80">: Normally Aspirated</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-span-12 rounded border p-4 transition-all duration-200 ease-linear hover:shadow-md lg:col-span-3">
            <div>
              <h1 className="border-b text-2xl font-bold text-gray-700">Performance</h1>
              <ul className="my-3">
                <li className="text-md flex items-center justify-between">
                  <span className="w-2/5 text-gray-900/90">Power</span>
                  <span className="w-3/5 text-gray-800/80">: 457 bhp</span>
                </li>
                <li className="text-md flex items-center justify-between">
                  <span className="w-2/5 text-gray-900/90">Torque</span>
                  <span className="w-3/5 text-gray-800/80">: 443 lbs/ft</span>
                </li>
                <li className="text-md flex items-center justify-between">
                  <span className="w-2/5 text-gray-900/90">Top speed</span>
                  <span className="w-3/5 text-gray-800/80">: 155 mph</span>
                </li>
                <li className="text-md flex items-center justify-between">
                  <span className="w-2/5 text-gray-900/90">Acceleration</span>
                  <span className="w-3/5 text-gray-800/80">: 0 to 62 in 4.6 s</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-span-12 rounded border p-4 transition-all duration-200 ease-linear hover:shadow-md lg:col-span-3">
            <div>
              <h1 className="border-b text-2xl font-bold text-gray-700">Transmission</h1>
              <ul className="my-3">
                <li className="text-md flex items-center justify-between">
                  <span className="w-2/5 text-gray-900/90">Type</span>
                  <span className="w-3/5 text-gray-800/80">: Auto</span>
                </li>
                <li className="text-md flex items-center justify-between">
                  <span className="w-2/5 text-gray-900/90">Gears</span>
                  <span className="w-3/5 text-gray-800/80">: 7</span>
                </li>
                <li className="text-md flex items-center justify-between">
                  <span className="w-2/5 text-gray-900/90">Driven wheels</span>
                  <span className="w-3/5 text-gray-800/80">: Rear Wheel Drive</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-span-12 rounded border p-4 transition-all duration-200 ease-linear hover:shadow-md lg:col-span-3">
            <div>
              <h1 className="border-b text-2xl font-bold text-gray-700">Exterior</h1>
              <ul className="my-3">
                <li className="text-md flex items-center justify-between">
                  <span className="w-2/5 text-gray-900/90">Doors</span>
                  <span className="w-3/5 text-gray-800/80">: 5</span>
                </li>
                <li className="text-md flex items-center justify-between">
                  <span className="w-2/5 text-gray-900/90">Colour</span>
                  <span className="w-3/5 text-gray-800/80">: Grey</span>
                </li>
                <li className="text-md flex items-center justify-between">
                  <span className="w-2/5 text-gray-900/90">Body type</span>
                  <span className="w-3/5 text-gray-800/80">: Estate</span>
                </li>
                <li className="text-md flex items-center justify-between">
                  <span className="w-2/5 text-gray-900/90">Seats</span>
                  <span className="w-3/5 text-gray-800/80">: 5</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="col-span-12 py-2">
        <h1 className="px-3 text-2xl font-semibold lg:px-0">Car Features</h1>
        <div className="my-3 flex flex-wrap items-center justify-start gap-3 px-3 lg:px-0">
          {[
            'DVD',
            'CC',
            'Sun Roof',
            'DVD',
            'CC',
            'Sun Roof',
            'DVD',
            'CC',
            'Sun Roof',
            'DVD',
            'CC',
            'Sun Roof',
            'DVD',
            'CC',
            'Sun Roof',
          ].map((item, idx) => (
            <div
              key={idx}
              className="flex items-center gap-2 rounded-md border px-3 py-1 text-gray-800/90"
            >
              <img src="/svg/check.svg" className="h-[20px] w-[20px]" alt="" />
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="col-span-12 p-2">
        <h1 className="px-3 text-2xl font-semibold lg:px-0">Description</h1>

        <p className="my-3 w-full text-gray-800/90 lg:w-4/5">
          D M Keith Select are delighted to offer you this Vauxhall Grandland X 1.2 turbo business
          edition nav 5 door. The car is presented in the elegant moonstone grey metallic. This car
          comes with satellite navigation, dab, front and rear parking sensors, apple
          carplay/android auto, cruise control and much more. Call us now to find out more on 01924
          665577.
        </p>
      </div>
    </div>
  )
}

export default ProductSpacification
