'use client'
import React, { useEffect, useState } from 'react'
import { Get, Gets } from '@/lib/api'
import { Button, Typography } from '@material-tailwind/react'
import { getSession } from 'next-auth/react'
import { ActionType } from '@/constants/constants'
import { Tag } from 'antd'
import appConfig from '@/config'
import SystemSettings from '@/components/dashboard/page/SystemSettings'
import UpdateProfile from '@/components/dashboard/page/UpdateProfile'
import UpdatePassword from '@/components/dashboard/page/UpdatePasswrod'

const Dashboard = () => {
  const [action, setAction] = useState({})
  const [data, setData] = useState({})
  const [reports, setReports] = useState({})
  // query
  useEffect(() => {
    ; (async () => {
      const newsession = await getSession()
      const params = { api: 'users', id: newsession?.user?.id }
      const productParams = { api: 'products' }
      const res = await Promise.resolve(Get(params))
      const result = await Promise.resolve(Gets(productParams))

      if (newsession?.user?.role !== 'Admin') {
        const newData = (result.data || []).filter((item) => item?.userId === newsession?.user?.id)
        let pending = 0
        let rejected = 0
        let approved = 0

        newData.forEach((item, index) => {
          if (item.status === "Pending") {
            pending = pending + 1
          }
          if (item.status === "Rejected") {
            rejected = rejected + 1
          }
          if (item.status === "Approved") {
            approved = approved + 1
          }
        })
        setReports({ pending: pending, approved: approved, rejected: rejected, total: (newData.length || 0) })
      } else {
        let pending = 0;
        let rejected = 0;
        let approved = 0;

        (result.data || []).forEach((item, index) => {
          if (item.status === "Pending") {
            pending = pending + 1
          }
          if (item.status === "Rejected") {
            rejected = rejected + 1
          }
          if (item.status === "Approved") {
            approved = approved + 1
          }
        })
        setReports({ pending: pending, approved: approved, rejected: rejected, total: (result.data.length || 0) })
      }
      setData(res.data)
    })()
  }, [action])

  return (
    <main className="mx-auto container py-5">
      <section>
        <div className="grid grid-cols-12 gap-5">
          <div className="col-span-12 flex flex-col items-center justify-center lg:col-span-2">
            <img
              className="h-36 w-36 rounded-md border object-cover shadow-sm"
              src={`${appConfig.apiBaseUrl}/uploads/${data?.photo || 'user.png'} `}
              alt="user"
            />
            <Button
              onClick={() =>
                setAction({
                  type: ActionType.UPDATE,
                  payload: data,
                })
              }
              variant="text"
              className="my-2 capitalize"
              fullWidth

              size="sm"
              color="blue"
            >
              Edit Profile
            </Button>
            <Button
              onClick={() =>
                setAction({
                  key: "UpdatePassword",
                  payload: data,
                })
              }
              variant="text"
              className="my-2 capitalize"
              fullWidth
              size="sm"
              color="blue"
            >
              Update Password
            </Button>
          </div>
          <div className="col-span-12 lg:col-span-10">
            <div>
              <table className="w-full lg:w-3/5">
                <tbody>
                  <tr>
                    <td className="w-[120px] font-medium">Full Name</td>
                    <td className="text-lg text-gray-800">: {data?.name}</td>
                  </tr>
                  <tr>
                    <td className="w-[120px] font-medium">User Name</td>
                    <td className="text-lg text-gray-800">
                      : <Tag>{data?.username}</Tag>
                    </td>
                  </tr>
                  <tr>
                    <td className="w-[120px] font-medium">Phone No.</td>
                    <td className="text-lg text-gray-800">: {data?.phone}</td>
                  </tr>
                  <tr>
                    <td className="w-[120px] font-medium">Email</td>
                    <td className="text-lg text-gray-800">: {data?.email || ''}</td>
                  </tr>
                  <tr>
                    <td className="w-[120px] font-medium">Address</td>
                    <td className="text-lg text-gray-800">: {data?.address || ''}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

        </div>
        <div className="grid gap-5 grid-cols-12">
          <div className="lg:col-span-3 col-span-12">
            <div className="flex flex-row items-center gap-4 rounded-sm p-4 shadow-sm hover:shadow-md ">
              <img className="h-12 w-12" src="/svg/delivery.svg" alt="" />
              <div>
                <Typography variant="h6" color="blue-gray" className="m-0">
                  All Car
                </Typography>
                <Typography variant="lead" color="current" className="m-0 text-2xl font-semibold">
                  {reports.total || 0}
                </Typography>
              </div>
            </div>
          </div>
          <div className="lg:col-span-3 col-span-12">
            <div className="flex flex-row items-center gap-4 rounded-sm p-4 shadow-sm hover:shadow-md ">
              <img className="h-12 w-12" src="/svg/order.svg" alt="" />
              <div>
                <Typography variant="h6" color="blue-gray" className="m-0">
                  Active Car
                </Typography>
                <Typography variant="lead" color="blue" className="m-0 text-2xl font-semibold">
                  {reports.approved || 0}
                </Typography>
              </div>
            </div>
          </div>
          <div className="lg:col-span-3 col-span-12">
            <div className="flex flex-row items-center gap-4 rounded-sm p-4 shadow-sm hover:shadow-md ">
              <img className="h-12 w-12" src="/svg/online.svg" alt="" />
              <div>
                <Typography variant="h6" color="blue-gray" className="m-0">
                  Pending Car
                </Typography>
                <Typography variant="lead" color="orange" className="m-0 text-2xl font-semibold">
                  {reports.pending || 0}
                </Typography>
              </div>
            </div>
          </div>
          <div className="lg:col-span-3 col-span-12">
            <div className="flex flex-row items-center gap-4 rounded-sm p-4 shadow-sm hover:shadow-md ">
              <img className="h-12 w-12" src="/svg/payment.svg" alt="" />
              <div>
                <Typography variant="h6" color="blue-gray" className="m-0">
                  Rejected Car
                </Typography>
                <Typography variant="lead" color="red" className="m-0 text-2xl font-semibold">
                  {reports.rejected || 0}
                </Typography>
              </div>
            </div>
          </div>
        </div>
      </section>

      {data?.role === 'Admin' && <SystemSettings />}

      {action.type === ActionType.UPDATE && <UpdateProfile action={action} setAction={setAction} />}
      {action.key === "UpdatePassword" && <UpdatePassword action={action} setAction={setAction} />}
    </main>
  )
}

export default Dashboard
