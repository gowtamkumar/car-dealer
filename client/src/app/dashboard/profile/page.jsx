'use client'
import React, { useState } from 'react'
import { Button, Input, Option, Select, Typography } from '@material-tailwind/react'
import { ColorList, getBgColor, getColor } from '../../../components/dashboard/profile/utils'
import { useSession } from 'next-auth/react'

const Profile = () => {
  const [theme, setTheme] = useState('blue')
  const [isEdit, setIsEdit] = useState(false)
  // const [user, setUser] = useState({})

  const userData = {}

  const handleProfile = (type) => {
    if (type === 'edit') return setIsEdit(true)
    if (type === 'save') return setIsEdit(false)
  }

  return (
    <section className="">
      <div className="relative">
        <div className={`relative h-72 w-full rounded-md border ${getBgColor(theme)}`}>
          <div className={`${!isEdit && 'invisible'} absolute bottom-5 right-5`}>
            <div className="flex flex-col items-center gap-3 md:flex-row">
              {ColorList.map((color, idx) => (
                <div
                  key={idx}
                  onClick={() => setTheme(color)}
                  className={`h-4 w-4 rounded-full bg-${color}-500  ${
                    color === theme
                      ? `ring-4 ring-${color}-500`
                      : `hover:ring-4 hover:ring-${color}-500`
                  }  ring-offst-2 cursor-pointer`}
                ></div>
              ))}
            </div>
          </div>
        </div>
        <div className="absolute -bottom-10 left-10 h-32 w-32 overflow-hidden rounded-full ring ring-green-500 ring-offset-2">
          <img src={userData.photo} alt="" />
        </div>
      </div>
      <div className="m-2 text-end">
        {!isEdit ? (
          <Button
            onClick={() => handleProfile('edit')}
            size="sm"
            variant="outlined"
            color={getColor(theme)}
            className="rounded-md px-2 py-1 capitalize"
          >
            Edit Profile
          </Button>
        ) : (
          <>
            <Button
              size="sm"
              variant="outlined"
              color={getColor(theme)}
              className="me-3 rounded-md px-2 py-1 capitalize"
              onClick={() => handleProfile('reset')}
            >
              Reset
            </Button>

            <Button
              size="sm"
              color={getColor(theme)}
              className="rounded-md px-2 py-1 capitalize"
              onClick={() => handleProfile('save')}
            >
              Save
            </Button>
          </>
        )}
      </div>
      <div className="grid grid-cols-2 items-center justify-center gap-3 rounded-sm p-5 shadow-sm md:grid-cols-3">
        <div>
          <small className={`${!isEdit ? 'visible' : 'invisible'} p-1`}>Full Name</small>
          <Input disabled={!isEdit} label="Full Name" value={userData.name} />
        </div>
        <div>
          <small className={`${!isEdit ? 'visible' : 'invisible'} p-1`}>Email</small>
          <Input disabled={!isEdit} label="Email" value={userData.email} />
        </div>
        <div>
          <small className={`${!isEdit ? 'visible' : 'invisible'} p-1`}>Phone</small>
          <Input disabled={!isEdit} label="Phone" value={userData.phone} />
        </div>
        <div>
          <small className={`${!isEdit ? 'visible' : 'invisible'} p-1`}>Balance</small>
          <Input disabled={!isEdit} label="Balance" value={userData.balance} />
        </div>
        <div>
          <small className={`${!isEdit ? 'visible' : 'invisible'} p-1`}>Date of Birth</small>
          <Input disabled={!isEdit} label="Balance" value={userData.dateOfBirth} />
        </div>
        <div className={`${isEdit ? 'visible' : 'invisible'} p-1`}>
          <small className="p-1"></small>
          <Select label="Status">
            <Option>Active</Option>
            <Option>In active</Option>
          </Select>
        </div>
      </div>
      <div className="my-8 grid grid-cols-2 justify-center  gap-5 md:grid-cols-4">
        <div className="flex flex-row items-center gap-4 rounded-sm p-4 shadow-sm hover:shadow-md ">
          <img className="h-12 w-12" src="/assets/svgs/order.svg" alt="" />
          <div>
            <Typography variant="h6" color="blue-gray" className="m-0">
              All Orders
            </Typography>
            <Typography variant="lead" color={theme} className="m-0 text-2xl font-semibold">
              {userData.totalOrder || '00'}
            </Typography>
          </div>
        </div>
        <div className="flex flex-row items-center gap-4 rounded-sm p-4 shadow-sm hover:shadow-md ">
          <img className="h-12 w-12" src="/assets/svgs/payment.svg" alt="" />
          <div>
            <Typography variant="h6" color="blue-gray" className="m-0">
              Awaiting Payments
            </Typography>
            <Typography variant="lead" color={theme} className="m-0 text-2xl font-semibold">
              {userData.awaitingPayment || '00'}
            </Typography>
          </div>
        </div>
        <div className="flex flex-row items-center gap-4 rounded-sm p-4 shadow-sm hover:shadow-md ">
          <img className="h-12 w-12" src="/assets/svgs/online.svg" alt="" />
          <div>
            <Typography variant="h6" color="blue-gray" className="m-0">
              Awaiting Shipment
            </Typography>
            <Typography variant="lead" color={theme} className="m-0 text-2xl font-semibold">
              {userData.awaitingShipment || '00'}
            </Typography>
          </div>
        </div>
        <div className="flex flex-row items-center gap-4 rounded-sm p-4 shadow-sm hover:shadow-md ">
          <img className="h-12 w-12" src="/assets/svgs/delivery.svg" alt="" />
          <div>
            <Typography variant="h6" color="blue-gray" className="m-0">
              Awaiting Delivery
            </Typography>
            <Typography variant="lead" color={theme} className="m-0 text-2xl font-semibold">
              {userData.awaitingDelivery || '00'}
            </Typography>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Profile
