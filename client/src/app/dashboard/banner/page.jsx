'use client'
import React, { useEffect, useState } from 'react'
import { Tabs } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { Button } from '@material-tailwind/react'
import { ActionType } from '../../../constants/constants'
import BannerList from '../../../components/dashboard/banner/BannerList'
import AddBanner from '../../../components/dashboard/banner/AddBanner'
import { Gets } from '../../../lib/api'

export default function Banners() {
  const [tabKey, setTabKey] = useState('banner_list')
  const [action, setAction] = useState({})
  const [banners, setBanners] = useState([])

  useEffect(() => {
    ;(async () => {
      const params = { api: 'banners' }
      const res = await Promise.resolve(Gets(params))
      setBanners(res.data || [])
    })()
  }, [action])

  return (
    <div className="container-fluid bg-white p-3  ">
      <Tabs
        activeKey={tabKey}
        onChange={(key) => setTabKey(key)}
        items={[
          {
            label: 'Banner List',
            key: 'banner_list',
            children: <BannerList setAction={setAction} banners={banners || []} />,
          },
          {
            label: 'Inactive',
            key: 'inactive',
            children: (
              <BannerList
                setAction={setAction}
                banners={(banners || []).filter((item) => !item.isActive)}
              />
            ),
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
