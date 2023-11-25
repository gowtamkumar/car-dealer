'use client'
import React, { useState } from 'react'
import { Tabs } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { Button } from '@material-tailwind/react'
import { ActionType } from '../../../constants/constants'
import UserList from '../../../components/dashboard/users/UserList'
import AddUser from '../../../components/dashboard/users/AddUser'

export default function Users() {
  const [tabKey, setTabKey] = useState('user_list')
  const [action, setAction] = useState({})

  return (
    <div className="container-fluid bg-white p-3  ">
      <Tabs
        activeKey={tabKey}
        onChange={(key) => setTabKey(key)}
        items={[
          {
            label: 'All User',
            key: 'user_list',
            children: <UserList setAction={setAction} />,
          },
          {
            label: 'Seller List',
            key: 'seller_list',
            children: <UserList setAction={setAction} filter="Seller" />,
          },
          {
            label: 'Operator List',
            key: 'operator_list',
            children: <UserList setAction={setAction} filter="Operator" />,
          },
        ]}
        tabBarExtraContent={
          <Button
            size="sm"
            variant="text"
            className="capitalize"
            onClick={() => setAction({ type: ActionType.CREATE })}
          >
            <PlusOutlined className="mx-1" /> Add User
          </Button>
        }
      />
      {action.type === ActionType.CREATE && <AddUser action={action} setAction={setAction} />}
      {action.type === ActionType.UPDATE && <AddUser action={action} setAction={setAction} />}
    </div>
  )
}
