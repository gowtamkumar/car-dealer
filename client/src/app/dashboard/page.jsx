'use client'
import React, { useEffect, useState } from 'react'
import { Get } from '@/lib/api'
import { Button, Typography } from '@material-tailwind/react'
import { useSession } from 'next-auth/react'
import { ActionType } from '@/constants/constants'
import { Tag } from 'antd'
import appConfig from '@/config'
import SystemSettings from '@/components/dashboard/page/SystemSettings'
import UpdateProfile from '@/components/dashboard/page/UpdateProfile'

const Dashboard = () => {
  const [action, setAction] = useState({})
  const [data, setData] = useState({})

  // query
  const session = useSession()

  useEffect(() => {
    ;(async () => {
      const params = { api: 'users', id: session?.data?.user?.id }
      const res = await Promise.resolve(Get(params))
      setData(res.data || [])
    })()
  }, [action])

  return (
    <main className="mx-aut container py-5">
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

          <div className="col-span-12 my-8 flex items-center justify-between gap-5">
            <div className="flex flex-grow flex-row items-center gap-4 rounded-sm p-4 shadow-sm hover:shadow-md ">
              <img className="h-12 w-12" src="/svg/delivery.svg" alt="" />
              <div>
                <Typography variant="h6" color="blue-gray" className="m-0">
                  All Car
                </Typography>
                <Typography variant="lead" color="current" className="m-0 text-2xl font-semibold">
                  {'00'}
                </Typography>
              </div>
            </div>
            <div className="flex flex-grow flex-row items-center gap-4 rounded-sm p-4 shadow-sm hover:shadow-md ">
              <img className="h-12 w-12" src="/svg/order.svg" alt="" />
              <div>
                <Typography variant="h6" color="blue-gray" className="m-0">
                  Active Car
                </Typography>
                <Typography variant="lead" color="blue" className="m-0 text-2xl font-semibold">
                  {'00'}
                </Typography>
              </div>
            </div>
            <div className="flex flex-grow flex-row items-center gap-4 rounded-sm p-4 shadow-sm hover:shadow-md ">
              <img className="h-12 w-12" src="/svg/online.svg" alt="" />
              <div>
                <Typography variant="h6" color="blue-gray" className="m-0">
                  Pending Car
                </Typography>
                <Typography variant="lead" color="orange" className="m-0 text-2xl font-semibold">
                  {'00'}
                </Typography>
              </div>
            </div>
            <div className="flex flex-grow flex-row items-center gap-4 rounded-sm p-4 shadow-sm hover:shadow-md ">
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
          </div>
        </div>
      </section>

      {session?.data?.user?.role === 'Admin' && <SystemSettings />}

      {action.type === ActionType.UPDATE && <UpdateProfile action={action} setAction={setAction} />}
    </main>
  )
}

export default Dashboard
