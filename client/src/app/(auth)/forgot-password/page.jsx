'use client'
import { Card, Input, Button, CardHeader, CardBody, Typography } from '@material-tailwind/react'
import Link from 'next/link'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'
import { SendForgotPassword, GetUserByUsername } from '../../../lib/api'

export default function ForgotPassword() {
  const [data, setData] = useState({})
  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const { username, email } = data

      const userFindByUserName = { api: 'users/username', data }

      const result = await GetUserByUsername(userFindByUserName)

      if (result.statusCode === 404) {
        return toast.error(result.errors)
      }

      const otp = Math.floor(Math.random() * 1000 * 9000)

      const params = { api: 'auth/forgot-password', data: { username, email, otp: otp } }

      const forgotPassword = await SendForgotPassword(params)

      localStorage.setItem('fromData', JSON.stringify({ id: forgotPassword.data?.id, email, otp: otp }))
      router.push('/verify')

    } catch (err) {
      console.log(err);
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
                Forgot Password
              </Typography>
            </CardHeader>
            <CardBody>
              <form autoComplete='false' onSubmit={handleSubmit}>
                <div className="p-0">
                  <div className="my-5">
                    <Input
                      onChange={({ target }) => setData({ ...data, username: target.value })}
                      variant="standard"
                      label="Username"
                      required
                    />
                  </div>
                  <div className="my-5">
                    <Input
                      onChange={({ target }) => setData({ ...data, email: target.value })}
                      variant="standard"
                      label="Email"
                      type="email"
                      required
                    />
                  </div>
                  <div className="my-5">
                    <Button type='submit' fullWidth variant="gradient" color="red">
                      Send
                    </Button>
                  </div>
                </div>
              </form>
            </CardBody>
          </Card>
        </div>
      </div>
    </section>
  )
}
