import { DocumentArrowUpIcon } from '@heroicons/react/24/outline'
import React from 'react'

const Dashboard = () => {
  return (
    <main>
      <div className="grid grid-cols-12 gap-5 p-4 lg:px-0">
        <div className="col-span-12 h-32 rounded-md border shadow lg:col-span-3">
          <div className="p-5">
            <div className="flex items-center justify-between">
              <h1 className="text-xl font-bold">Total Post</h1>
              <DocumentArrowUpIcon className="h-[20px] w-[20px]" />
            </div>
            <p>0</p>
          </div>
        </div>
        <div className="col-span-12 h-32 rounded-md border shadow lg:col-span-3">
          <div className="p-5">
            <div className="flex items-center justify-between">
              <h1>Total Post</h1>
              <h1>Total Post</h1>
            </div>
            <p>0</p>
          </div>
        </div>
        <div className="col-span-12 h-32 rounded-md border shadow lg:col-span-3">
          <div className="p-5">
            <div className="flex items-center justify-between">
              <h1>Total Post</h1>
              <h1>Total Post</h1>
            </div>
            <p>0</p>
          </div>
        </div>
        <div className="col-span-12 h-32 rounded-md border shadow lg:col-span-3">
          <div className="p-5">
            <div className="flex items-center justify-between">
              <h1>Total Post</h1>
              <h1>Total Post</h1>
            </div>
            <p>0</p>
          </div>
        </div>
        <div className="col-span-12 h-40 rounded-md border p-3 shadow">Ads</div>
      </div>
    </main>
  )
}

export default Dashboard
