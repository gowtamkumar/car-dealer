'use client'
import React from 'react'
const Dashboard = () => {


  return (
    <main>
      <section className='container mx-aut py-5'>
        <div className="grid grid-cols-12 gap-5 px-5">
          <div className="lg:col-span-4 col-span-12">
            <div className="border p-2 rounded-sm shadow-md">
              <h1 className='border-b p-2 text-lg font-bold text-green-400'>Approved</h1>
              <p className='text-4xl px-2 pt-4 text-green-400'>00</p>
              <p className='p-2'>Approved this month</p>
            </div>
          </div>
          <div className="lg:col-span-4 col-span-12">
            <div className="border p-2 rounded-sm shadow-md">
              <h1 className='border-b p-2 text-lg font-bold text-orange-500'>Pending</h1>
              <p className='text-4xl px-2 pt-4 text-orange-500'>00</p>
              <p className='p-2'>Pending this month</p>
            </div>
          </div>
          <div className="lg:col-span-4 col-span-12">
            <div className="border p-2 rounded-sm shadow-md">
              <h1 className='border-b p-2 text-lg font-bold text-red-400'>Rejected</h1>
              <p className='text-4xl px-2 pt-4 text-red-400'>00</p>
              <p className='p-2'>Rejected this month</p>
            </div>
          </div>
        </div>
      </section>
      {/* <section className="py-2">
        <div className="my-2 text-end">
          <Button
            onClick={() => setOpen(true)}
            size="sm"
            variant="outlined"
            className="rounded-md px-2 py-1 capitalize"
          >
            Edit Profile
          </Button>
        </div>

        <div className="grid grid-cols-12 gap-5 p-5 shadow-md">
          <div className="col-span-2">
            <div className="h-52 w-full rounded-xl bg-[url('/masud.png')] bg-cover bg-center"></div>
          </div>
          <div className="col-span-10">
            <div className="mb-2">
              <small>Name :</small>
              <h1 className="text-xl">{data.user?.name}</h1>
            </div>
            <div className="mb-2">
              <small>Email :</small>
              <h1 className="text-xl">{data.user?.email}</h1>
            </div>
            <div className="mb-2">
              <small>Date Of Birth :</small>
              <h1 className="text-xl">{data.user?.dob || 'Not Defiend'}</h1>
            </div>
            <div className="mb-2">
              <small>Address :</small>
              <h1 className="text-xl">{data.user?.address || 'Not Defiend'}</h1>
            </div>
          </div>
        </div>

        <div className="my-8 grid grid-cols-2 justify-center  gap-5 md:grid-cols-4">
          <div className="flex flex-row items-center gap-4 rounded-sm p-4 shadow-sm hover:shadow-md ">
            <img className="h-12 w-12" src="/svg/delivery.svg" alt="" />
            <div>
              <Typography variant="h6" color="blue-gray" className="m-0">
                All Car
              </Typography>
              <Typography variant="lead" color="red" className="m-0 text-2xl font-semibold">
                {'00'}
              </Typography>
            </div>
          </div>
          <div className="flex flex-row items-center gap-4 rounded-sm p-4 shadow-sm hover:shadow-md ">
            <img className="h-12 w-12" src="/svg/order.svg" alt="" />
            <div>
              <Typography variant="h6" color="blue-gray" className="m-0">
                Active Car
              </Typography>
              <Typography variant="lead" color="red" className="m-0 text-2xl font-semibold">
                {'00'}
              </Typography>
            </div>
          </div>
          <div className="flex flex-row items-center gap-4 rounded-sm p-4 shadow-sm hover:shadow-md ">
            <img className="h-12 w-12" src="/svg/payment.svg" alt="" />
            <div>
              <Typography variant="h6" color="blue-gray" className="m-0">
                Rejected Car
              </Typography>
              <Typography variant="lead" color="red" className="m-0 text-2xl font-semibold">
                {'00'}
              </Typography>
            </div>
          </div>
          <div className="flex flex-row items-center gap-4 rounded-sm p-4 shadow-sm hover:shadow-md ">
            <img className="h-12 w-12" src="/svg/online.svg" alt="" />
            <div>
              <Typography variant="h6" color="blue-gray" className="m-0">
                Pending Car
              </Typography>
              <Typography variant="lead" color="red" className="m-0 text-2xl font-semibold">
                {'00'}
              </Typography>
            </div>
          </div>
        </div>
      </section> */}
    </main>
  )
}

export default Dashboard
