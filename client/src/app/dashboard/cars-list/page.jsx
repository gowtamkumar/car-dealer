'use client'
import React, { useEffect, useState } from 'react'
import { Tabs } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import CarList from '../../../components/dashboard/cars/CarList'
import CarDetails from '../../../components/dashboard/cars/CarDetails'
import CarStatus from '../../../components/dashboard/cars/CarStatus'
import { Button } from '@material-tailwind/react'
import { useRouter } from 'next/navigation'
import { ActionType } from '../../../constants/constants'
import { Gets } from '../../../lib/api'
import { useSession } from 'next-auth/react'

export default function Cars() {
  const [tabKey, setTabKey] = useState('cars_list')
  const [action, setAction] = useState({})
  const [cars, setCars] = useState([])

  const router = useRouter()
  const { data } = useSession()
  const { user } = data || {}

  useEffect(() => {
    ; (async () => {
      const params = { api: 'products' }
      const res = await Promise.resolve(Gets(params))
      if (user?.role !== 'Admin') {
        const newData = (res.data || []).filter((item) => item?.userId === user?.id)
        setCars(newData)
      } else {
        setCars(res.data || [])
      }
    })()
  }, [action])

  return (
    <div className="container-fluid bg-white p-3  ">
      <Tabs
        activeKey={tabKey}
        onChange={(key) => setTabKey(key)}
        items={[
          {
            label: 'All Cars',
            key: 'cars_list',
            children: <CarList setAction={setAction} cars={cars || []} />,
          },
          {
            label: 'Approved',
            key: 'approved',
            children: (
              <CarList
                setAction={setAction}
                cars={(cars || []).filter((item) => item.status === 'Approved')}
              />
            ),
          },
          {
            label: 'Pending',
            key: 'pending',
            children: (
              <CarList
                setAction={setAction}
                cars={(cars || []).filter((item) => item.status === 'Pending')}
              />
            ),
          },
          {
            label: 'Rejected',
            key: 'rejected',
            children: (
              <CarList
                setAction={setAction}
                cars={(cars || []).filter((item) => item.status === 'Rejected')}
              />
            ),
          },
        ]}
        tabBarExtraContent={
          <Button
            size="sm"
            variant="text"
            className="capitalize"
            onClick={() => router.replace(`/dashboard/add-product/new`)}
          >
            <PlusOutlined className="mx-1" /> Uplaod Car
          </Button>
        }
      />
      {/* {action.type === ActionType.DELETE && (
        <DeletePurchase action={action} setAction={setAction} />
      )} */}
      {action.type === ActionType.VIEW && <CarDetails action={action} setAction={setAction} />}
      {action.type === ActionType.APPROVE && <CarStatus action={action} setAction={setAction} />}
    </div>
  )
}
