'use client'
import React, { useState } from 'react'
import { Tabs } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { Button } from '@material-tailwind/react'
import { ActionType } from '../../../lib/constants'
import ModelList from '../../../components/dashboard/models/ModelList'
import AddModel from '../../../components/dashboard/models/AddModel'

export default function Models() {
  const [tabKey, setTabKey] = useState('model_list')
  const [action, setAction] = useState({})

  return (
    <div className="container-fluid bg-white p-3  ">
      <Tabs
        activeKey={tabKey}
        onChange={(key) => setTabKey(key)}
        items={[
          {
            label: 'Model List',
            key: 'model_list',
            children: <ModelList setAction={setAction} status={''} />,
          },
          {
            label: 'Active',
            key: 'active',
            children: <ModelList setAction={setAction} status={'Active'} />,
          },
          {
            label: 'Inactive',
            key: 'inactive',
            children: <ModelList setAction={setAction} status={'Inactive'} />,
          },
        ]}
        tabBarExtraContent={
          <Button
            size="sm"
            variant="text"
            className="capitalize"
            onClick={() => setAction({ type: ActionType.CREATE })}
          >
            <PlusOutlined className="mx-1" /> Add Model
          </Button>
        }
      />
      {action.type === ActionType.CREATE && <AddModel action={action} setAction={setAction} />}
      {action.type === ActionType.UPDATE && <AddModel action={action} setAction={setAction} />}
      {/* {action.type === ActionType.VIEW && <PurchaseDetails action={action} setAction={setAction} />} */}
    </div>
  )
}
