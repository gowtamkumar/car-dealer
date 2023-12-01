'use client'
import React from 'react'
import { Divider } from 'antd';
import appConfig from '@/config';
import { Button } from '@material-tailwind/react';

const Dashboard = () => {

  return (
    <main className='container mx-aut py-5'>
      <section>
        {/* <Divider orientation='left'>Profile</Divider> */}
        <div className="grid grid-cols-12 gap-5">
          <div className="lg:col-span-2 col-span-12">
            <img className='rounded-full w-40 h-40' src={`${appConfig.apiBaseUrl}/uploads/${'user.png'} `}
              alt="user" />
          </div>
          <div className="lg:col-span-7 col-span-12">
            <div className='flex justify-between items-center py-2 border-b'>
              <h1 className='font-semibold text-lg'>Profile</h1>
              <Button variant='text' className='capitalize' size='sm' color='red'>Edit Profile</Button>
            </div>
            <div className="grid grid-cols-12 gap-5">
              <div className="col-span-4">
                Full Name
              </div>
              <div className="col-span-4">
                Name
              </div>
              <div className="col-span-4">
                Name
              </div>
            </div>
          </div>
          <div className="lg:col-span-3 col-span-12">
            <div className="border p-2 rounded-sm shadow-md mb-3">
              <h1 className='border-b p-2 text-lg font-bold text-green-400'>Approved</h1>
              <p className='text-4xl px-2 pt-4 text-green-400'>00</p>
              <p className='p-2'>Approved this month</p>
            </div>

            <div className="border p-2 rounded-sm shadow-md mb-3">
              <h1 className='border-b p-2 text-lg font-bold text-orange-500'>Pending</h1>
              <p className='text-4xl px-2 pt-4 text-orange-500'>00</p>
              <p className='p-2'>Pending this month</p>
            </div>

            <div className="border p-2 rounded-sm shadow-md mb-3">
              <h1 className='border-b p-2 text-lg font-bold text-red-400'>Rejected</h1>
              <p className='text-4xl px-2 pt-4 text-red-400'>00</p>
              <p className='p-2'>Rejected this month</p>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="grid grid-cols-12 gap-5 lg:px-0 px-5">
          <div className="col-span-12">
            <Divider orientation='left'>System Settings</Divider>
          </div>
        </div>
      </section>
    </main>
  )
}

export default Dashboard
