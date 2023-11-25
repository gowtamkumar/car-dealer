'use client'
import React, { useEffect, useState } from 'react'
import { Tabs } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { Button } from '@material-tailwind/react'
import ModelList from '../../../components/dashboard/models/ModelList'
import AddModel from '../../../components/dashboard/models/AddModel'
import { Gets } from '../../../lib/api'
import { ActionType } from '../../../constants/constants'

export default function Models() {
  const [tabKey, setTabKey] = useState('model_list')
  const [action, setAction] = useState({})
  const [models, setModels] = useState([])


  useEffect(() => {
    ; (async () => {
      const params = { api: 'models' }
      const res = await Gets(params)
      setModels(res?.data)
    })()
  }, [action])

  return (
    <div className="container-fluid bg-white p-3  ">
      <Tabs
        activeKey={tabKey}
        onChange={(key) => setTabKey(key)}
        items={[
          {
            label: 'Model List',
            key: 'model_list',
            children: <ModelList setAction={setAction} models={(models || [])} />,
          },
          {
            label: 'Active',
            key: 'active',
            children: <ModelList setAction={setAction} models={(models || []).filter((item) => item.isActive)} />,
          },
          {
            label: 'Inactive',
            key: 'inactive',
            children: <ModelList setAction={setAction} models={(models || []).filter((item) => !item.isActive)} />,
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
    </div>
  )
}
