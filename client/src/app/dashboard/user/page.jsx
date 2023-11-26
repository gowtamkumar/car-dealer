'use client'
import React, { useEffect, useState } from 'react'
import { Tabs } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { Button } from '@material-tailwind/react'
import { ActionType } from '../../../constants/constants'
import UserList from '../../../components/dashboard/users/UserList'
import AddUser from '../../../components/dashboard/users/AddUser'
import { Gets } from '../../../lib/api'

export default function Users() {
  const [tabKey, setTabKey] = useState('user_list')
  const [action, setAction] = useState({})
  const [users, setUsers] = useState([])

  useEffect(() => {
    ;(async () => {
      const params = { api: 'users' }
      const res = await Promise.resolve(Gets(params))
      setUsers(res.data || [])
    })()
  }, [action])

  return (
    <div className="container-fluid bg-white p-3  ">
      <Tabs
        activeKey={tabKey}
        onChange={(key) => setTabKey(key)}
        items={[
          {
            label: 'All User',
            key: 'user_list',
            children: <UserList setAction={setAction} users={users || []} />,
          },
          {
            label: 'Seller List',
            key: 'seller_list',
            children: (
              <UserList
                setAction={setAction}
                users={(users || []).filter((item) => item.role === 'Seller')}
              />
            ),
          },
          {
            label: 'Operator List',
            key: 'operator_list',
            children: (
              <UserList
                setAction={setAction}
                users={(users || []).filter((item) => item.role === 'Operator')}
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
            <PlusOutlined className="mx-1" /> Add User
          </Button>
        }
      />
      {action.type === ActionType.CREATE && <AddUser action={action} setAction={setAction} />}
      {action.type === ActionType.UPDATE && <AddUser action={action} setAction={setAction} />}
    </div>
  )
}
