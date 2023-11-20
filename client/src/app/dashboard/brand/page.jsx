'use client'
import React, { useState } from 'react'
import { Tabs } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { Button } from '@material-tailwind/react'
import { ActionType } from '../../../lib/constants'
import BrandList from '../../../components/dashboard/brands/BrandList'
import AddBrand from '../../../components/dashboard/brands/AddBrand'

export default function Brands() {
  const [tabKey, setTabKey] = useState('brand_list')
  const [action, setAction] = useState({})

  return (
    <div className="container-fluid bg-white p-3  ">
      <Tabs
        activeKey={tabKey}
        onChange={(key) => setTabKey(key)}
        items={[
          {
            label: 'All Brands',
            key: 'brand_list',
            children: <BrandList setAction={setAction} />,
          },
          {
            label: 'Active',
            key: 'active',
            children: <BrandList setAction={setAction} filter="Active" />,
          },
          {
            label: 'Inactive',
            key: 'inactive',
            children: <BrandList setAction={setAction} filter="Inactive" />,
          },
        ]}
        tabBarExtraContent={
          <Button
            size="sm"
            variant="text"
            className="capitalize"
            onClick={() => setAction({ type: ActionType.CREATE })}
          >
            <PlusOutlined className="mx-1" /> Add Brand
          </Button>
        }
      />
      {action.type === ActionType.CREATE && <AddBrand action={action} setAction={setAction} />}
      {action.type === ActionType.UPDATE && <AddBrand action={action} setAction={setAction} />}
      {/* {action.type === ActionType.VIEW && <PurchaseDetails action={action} setAction={setAction} />} */}
    </div>
  )
}
