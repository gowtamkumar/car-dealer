'use client'
import { Card, Input, Button, CardHeader, CardBody, Typography } from '@material-tailwind/react'
import Link from 'next/link'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { UserResetPassword } from '../../../lib/api'

export default function ResetPassword() {
  const [data, setData] = useState({})
  const router = useRouter()

  const locData = localStorage.getItem('fromData')
  const newData = JSON.parse(locData)

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const params = {
        id: newData.id,
        api: 'auth/reset-password',
        data: { newPassword: data.newPassword }
      }
      await UserResetPassword(params)
      localStorage.clear()
      router.push('/login')

    } catch (error) {
      console.log(error);
    }
  }

  return (
    <section className="min-h-screen bg-gray-50">
      <div className="container mx-auto py-5">
        <div className="flex min-h-[70vh] items-center justify-center">
          <Card className="w-full max-w-[24rem]">
            <CardHeader
              color="white"
              floated={true}
              shadow={true}
              className="m-0 grid place-items-center border p-4 text-center"
            >
              <Link href="/">
                <div className="mb-4 h-20 p-6">
                  <img alt="paypal " className="w-52 " src="/logo.png" />
                </div>
              </Link>
              <Typography variant="h4" className="my-3" color="blue-gray">
                Reset Password
              </Typography>
            </CardHeader>
            <CardBody>
              <form autoComplete='false' onSubmit={handleSubmit}>
                <div className="p-0">
                  <div className="my-5">
                    <Input
                      onChange={({ target }) => setData({ ...data, newPassword: target.value })}
                      variant="standard"
                      label="New Password"
                    // required
                    />
                  </div>

                  <div className="my-5">
                    <Button type='submit' fullWidth variant="gradient" color="red">
                      Send
                    </Button>
                  </div>
                  {/* <hr />
                  <div className="my-3 flex items-center justify-between">
                    <Link className="hover:text-red-300 hover:underline" href="/forgot-password">
                      <span>Forgotten password?</span>
                    </Link>
                    <Link className="hover:text-red-300 hover:underline" href="/signup">
                      <span>Register</span>
                    </Link>
                  </div> */}
                </div>
              </form>
            </CardBody>
          </Card>
        </div>
      </div>
    </section>
  )
}
