'use client'
import React, { useState } from 'react'
import { Tabs } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { Button } from '@material-tailwind/react'
import { ActionType } from '../../../lib/constants'
import ModelCodeList from '../../../components/dashboard/modelCodes/ModelCodeList'
import AddModelCode from '../../../components/dashboard/modelCodes/AddModelCode'

export default function ModelCodes() {
  const [tabKey, setTabKey] = useState('modelCode_list')
  const [action, setAction] = useState({})

  return (
    <div className="container-fluid bg-white p-3  ">
      <Tabs
        activeKey={tabKey}
        onChange={(key) => setTabKey(key)}
        items={[
          {
            label: 'Model Code List',
            key: 'modelCode_list',
            children: <ModelCodeList setAction={setAction} status={''} />,
          },
          {
            label: 'Active',
            key: 'active',
            children: <ModelCodeList setAction={setAction} status={'Active'} />,
          },
          {
            label: 'Inactive',
            key: 'inactive',
            children: <ModelCodeList setAction={setAction} status={'Inactive'} />,
          },
        ]}
        tabBarExtraContent={
          <Button
            size="sm"
            variant="text"
            className="capitalize"
            onClick={() => setAction({ type: ActionType.CREATE })}
          >
            <PlusOutlined className="mx-1" /> Add Model Code
          </Button>
        }
      />
      {action.type === ActionType.CREATE && <AddModelCode action={action} setAction={setAction} />}
      {action.type === ActionType.UPDATE && <AddModelCode action={action} setAction={setAction} />}
      {/* {action.type === ActionType.VIEW && <PurchaseDetails action={action} setAction={setAction} />} */}
    </div>
  )
}
