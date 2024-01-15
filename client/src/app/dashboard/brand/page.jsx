'use client'
import React, { useEffect, useState } from 'react'
import { Tabs } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { Button } from '@material-tailwind/react'
import { ActionType } from '../../../constants/constants'
import BrandList from '../../../components/dashboard/brands/BrandList'
import AddBrand from '../../../components/dashboard/brands/AddBrand'
import { Gets } from '../../../lib/api'

export default function Brands() {
  const [tabKey, setTabKey] = useState('brand_list')
  const [action, setAction] = useState({})
  const [brands, setBrands] = useState([])


  useEffect(() => {
    ; (async () => {
      const params = { api: 'brands' }
      const res = await Promise.resolve(Gets(params))
      setBrands(res?.data)
    })()
  }, [action])

  return (
    <div className="container-fluid bg-white p-3  ">
      <Tabs
        activeKey={tabKey}
        onChange={(key) => setTabKey(key)}
        items={[
          {
            label: 'All Makes',
            key: 'brand_list',
            children: <BrandList setAction={setAction} brands={brands} />,
          },
          {
            label: 'Active',
            key: 'active',
            children: (
              <BrandList setAction={setAction}
                brands={brands.filter((item) => item.isActive)}
              />
            ),
          },
          {
            label: 'Inactive',
            key: 'inactive',
            children: (
              <BrandList setAction={setAction}
                brands={brands.filter((item) => !item.isActive)}
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
            <PlusOutlined className="mx-1" /> Add Make
          </Button>
        }
      />
      <AddBrand action={action} setAction={setAction} />

      {/* {action.type === ActionType.CREATE && <AddBrand action={action} setAction={setAction} />}
      {action.type === ActionType.UPDATE && <AddBrand action={action} setAction={setAction} />} */}
    </div>
  )
}
