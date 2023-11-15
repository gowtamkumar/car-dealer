'use client'
import React, { useState } from 'react'
// import { useNavigate } from 'react-router-dom'
import { Tabs } from 'antd'
import { PlusOutlined } from '@ant-design/icons'

import CarList from '../../../components/dashboard/cars/CarList'

import { ActionType } from '../../../lib/constants'
import { Button } from '@material-tailwind/react'
import { useRouter } from 'next/navigation'

export default function Cars() {
  const [tabKey, setTabKey] = useState('cars_list')
  const [action, setAction] = useState({})

  const router = useRouter()

  return (
    <div className="container-fluid bg-white p-3  ">
      <Tabs
        activeKey={tabKey}
        onChange={(key) => setTabKey(key)}
        items={[
          {
            label: 'All Cars',
            key: 'cars_list',
            children: <CarList setAction={setAction} status={''} />,
          },
          {
            label: 'Approved',
            key: 'approved',
            children: <CarList setAction={setAction} status={'Approved'} />,
          },
          {
            label: 'Pending',
            key: 'pending',
            children: <CarList setAction={setAction} status={'Pending'} />,
          },
          {
            label: 'Rejected',
            key: 'rejected',
            children: <CarList setAction={setAction} status={'Rejected'} />,
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
      {/* {action.type === ActionType.VIEW && <PurchaseDetails action={action} setAction={setAction} />} */}
    </div>
  )
}
