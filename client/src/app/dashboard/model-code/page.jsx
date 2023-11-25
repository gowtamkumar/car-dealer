'use client'
import React, { useEffect, useState } from 'react'
import { Tabs } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { Button } from '@material-tailwind/react'
import { ActionType } from '../../../constants/constants'
import ModelCodeList from '../../../components/dashboard/modelCodes/ModelCodeList'
import AddModelCode from '../../../components/dashboard/modelCodes/AddModelCode'
import { Gets } from '../../../lib/api'

export default function ModelCodes() {
  const [tabKey, setTabKey] = useState('modelCode_list')
  const [action, setAction] = useState({})
  const [modelCodes, setModelCodes] = useState([])


  useEffect(() => {
    ; (async () => {
      const params = { api: 'model-codes' }
      const res = await Gets(params)
      setModelCodes(res?.data)
    })()
  }, [])

  return (
    <div className="container-fluid bg-white p-3  ">
      <Tabs
        activeKey={tabKey}
        onChange={(key) => setTabKey(key)}
        items={[
          {
            label: 'Model Code List',
            key: 'modelCode_list',
            children: <ModelCodeList setAction={setAction} modelCodes={modelCodes} />,
          },
          {
            label: 'Active',
            key: 'active',
            children: <ModelCodeList setAction={setAction} modelCodes={modelCodes.filter(item => item.isActive)} />,
          },
          {
            label: 'Inactive',
            key: 'inactive',
            children: <ModelCodeList setAction={setAction} modelCodes={modelCodes.filter(item => !item.isActive)} />,
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
