import Link from 'next/link'
import React from 'react'

const BrandListSection = () => {

  const brandData = [
    { name: 'Toyota', img: '/svg/toyota.svg' },
    { name: 'Honda', img: '/svg/honda.svg' },
    { name: 'Mitsubishi', img: '/svg/mitsubishi.svg' },
    { name: 'Nissan', img: '/svg/nissan.svg' },
    { name: 'Hyundai', img: '/svg/hyundai.svg' },
    { name: 'Suzuki', img: '/svg/suzuki.svg' },
  ]

  return (
    <section className="container mx-auto my-10 lg:my-20">
      <div className="grid grid-cols-12 gap-3">
        {brandData.map((item, idx) => (
          <div
            key={idx}
            className="col-span-6  cursor-pointer rounded-md p-3 text-lg italic text-gray-800 outline-1 transition-all hover:shadow-md lg:col-span-2 lg:text-2xl"
          >
            <Link className="flex flex-col items-center" href="/products">
              <img className="h-auto lg:w-24 w-14" src={item.img} alt={item.name} />
              <h1>{item.name}</h1>
            </Link>
          </div>
        ))}
      </div>
    </section>
  )
}

export default BrandListSection
