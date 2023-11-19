'use client'
import React, { useEffect, useState } from 'react'
import { Button, Typography } from '@material-tailwind/react'
import { PlusOutlined } from '@ant-design/icons'
import { Upload, Input, Divider, DatePicker, Modal } from 'antd'
import { useSession } from 'next-auth/react'
import Loading from '../loading'

const Dashboard = () => {
  const [open, setOpen] = useState(false)
  const [formValues, setFormValues] = useState({})
  const [user, setUser] = useState({})
  const session = useSession()

  const { data } = session

  // const handleProfile = (type) => {
  //   if (type === 'edit') return setIsEdit(true)
  //   if (type === 'save') return setIsEdit(false)
  // }

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </div>
  )

  const handleChange = ({ fileList: newFileList }) => setFormValues({ fileList: newFileList })

  return (
    <>
      {session.status === 'loading' ? (
        <Loading />
      ) : (
        <main>
          <section className="py-2">
            <div className="my-2 text-end">
              <Button
                onClick={() => setOpen(true)}
                size="sm"
                variant="outlined"
                className="rounded-md px-2 py-1 capitalize"
              >
                Edit Profile
              </Button>
            </div>

            <div className="grid grid-cols-12 gap-5 p-5 shadow-md">
              <div className="col-span-2">
                <div className="h-52 w-full rounded-xl bg-[url('/masud.png')] bg-cover bg-center"></div>
              </div>
              <div className="col-span-10">
                <div className="mb-2">
                  <small>Name :</small>
                  <h1 className="text-xl">{data.user?.name}</h1>
                </div>
                <div className="mb-2">
                  <small>Email :</small>
                  <h1 className="text-xl">{data.user?.email}</h1>
                </div>
                <div className="mb-2">
                  <small>Date Of Birth :</small>
                  <h1 className="text-xl">{data.user?.dob || 'Not Defiend'}</h1>
                </div>
                <div className="mb-2">
                  <small>Address :</small>
                  <h1 className="text-xl">{data.user?.address || 'Not Defiend'}</h1>
                </div>
              </div>
            </div>

            <div className="my-8 grid grid-cols-2 justify-center  gap-5 md:grid-cols-4">
              <div className="flex flex-row items-center gap-4 rounded-sm p-4 shadow-sm hover:shadow-md ">
                <img className="h-12 w-12" src="/svg/delivery.svg" alt="" />
                <div>
                  <Typography variant="h6" color="blue-gray" className="m-0">
                    All Car
                  </Typography>
                  <Typography variant="lead" color="red" className="m-0 text-2xl font-semibold">
                    {'00'}
                  </Typography>
                </div>
              </div>
              <div className="flex flex-row items-center gap-4 rounded-sm p-4 shadow-sm hover:shadow-md ">
                <img className="h-12 w-12" src="/svg/order.svg" alt="" />
                <div>
                  <Typography variant="h6" color="blue-gray" className="m-0">
                    Active Car
                  </Typography>
                  <Typography variant="lead" color="red" className="m-0 text-2xl font-semibold">
                    {'00'}
                  </Typography>
                </div>
              </div>
              <div className="flex flex-row items-center gap-4 rounded-sm p-4 shadow-sm hover:shadow-md ">
                <img className="h-12 w-12" src="/svg/payment.svg" alt="" />
                <div>
                  <Typography variant="h6" color="blue-gray" className="m-0">
                    Rejected Car
                  </Typography>
                  <Typography variant="lead" color="red" className="m-0 text-2xl font-semibold">
                    {'00'}
                  </Typography>
                </div>
              </div>
              <div className="flex flex-row items-center gap-4 rounded-sm p-4 shadow-sm hover:shadow-md ">
                <img className="h-12 w-12" src="/svg/online.svg" alt="" />
                <div>
                  <Typography variant="h6" color="blue-gray" className="m-0">
                    Pending Car
                  </Typography>
                  <Typography variant="lead" color="red" className="m-0 text-2xl font-semibold">
                    {'00'}
                  </Typography>
                </div>
              </div>
            </div>
          </section>

          <Modal
            title="Update Profile"
            zIndex={1050}
            open={open}
            footer={null}
            onCancel={() => setOpen(false)}
          >
            Prolde
          </Modal>
        </main>
      )}
    </>
  )
}

export default Dashboard
