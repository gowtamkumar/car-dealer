import React from 'react'

const Dashboard = () => {
  return (
    <main>
      <div className="grid grid-cols-12 gap-5">
        <div className="col-span-4 h-40 rounded-md border bg-cyan-500/20"></div>
        <div className="col-span-4 h-40 rounded-md border bg-red-500/20"></div>
        <div className="col-span-4 h-40 rounded-md border bg-yellow-500/20"></div>
        <div className="col-span-12 h-40 rounded-md border p-3">Ads</div>
      </div>
    </main>
  )
}

export default Dashboard
