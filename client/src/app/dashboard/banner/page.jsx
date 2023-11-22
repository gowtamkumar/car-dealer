'use client'
import React, { useState } from 'react'
import { Tabs } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { Button } from '@material-tailwind/react'
import { ActionType } from '../../../lib/constants'
import BannerList from '../../../components/dashboard/banner/BannerList'
import AddBanner from '../../../components/dashboard/banner/AddBanner'

export default function Banners() {
  const [tabKey, setTabKey] = useState('banner_list')
  const [action, setAction] = useState({})

  return (
    <div className="container-fluid bg-white p-3  ">
      <Tabs
        activeKey={tabKey}
        onChange={(key) => setTabKey(key)}
        items={[
          {
            label: 'Banner List',
            key: 'banner_list',
            children: <BannerList setAction={setAction} status={''} />,
          },
          {
            label: 'Active',
            key: 'active',
            children: <BannerList setAction={setAction} status={'Active'} />,
          },
          {
            label: 'Inactive',
            key: 'inactive',
            children: <BannerList setAction={setAction} status={'Inactive'} />,
          },
        ]}
        tabBarExtraContent={
          <Button
            size="sm"
            variant="text"
            className="capitalize"
            onClick={() => setAction({ type: ActionType.CREATE })}
          >
            <PlusOutlined className="mx-1" /> Add Banner
          </Button>
        }
      />
      {action.type === ActionType.CREATE && <AddBanner action={action} setAction={setAction} />}
      {action.type === ActionType.UPDATE && <AddBanner action={action} setAction={setAction} />}
      {/* {action.type === ActionType.VIEW && <PurchaseDetails action={action} setAction={setAction} />} */}
    </div>
  )
}
