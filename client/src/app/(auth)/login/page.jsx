'use client'
import { Card, Input, Button, CardHeader, CardBody, Typography } from '@material-tailwind/react'
import Link from 'next/link'
import React, { useState } from 'react'
import { signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'

export default function Login() {
  const [data, setData] = useState({})
  const router = useRouter()

  const session = useSession()
  if (session.status === 'authenticated') {
    router.push('/')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const { username, password } = data

    try {
      const result = await signIn('credentials', {
        username,
        password,
        redirect: false,
      })
      if (result.error) {
        return toast.error('Wrong username or password')
      }
      if (result.ok) {
        toast.success('Login successfully')
      }

      if (result.status === 200) {
        setTimeout(() => {
          router.push('/')
        }, 1000)
      }
    } catch (err) {
      toast.error(err)
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
                Login as a Seller
              </Typography>
            </CardHeader>
            <CardBody><div className="p-0">
              <div className="my-5">
                <Input
                  onChange={({ target }) => setData({ ...data, username: target.value })}
                  variant="standard"
                  label="Username"
                />
              </div>
              <div className="my-5">
                <Input
                  onChange={({ target }) => setData({ ...data, password: target.value })}
                  variant="standard"
                  label="Password"
                  type="password"
                />
              </div>
              <div className="my-5">
                <Button onClick={handleSubmit} fullWidth variant="gradient" color="red">
                  Log In
                </Button>
              </div>
              <hr />
              <div className="my-3 flex items-center justify-between">
                <Link className="hover:text-red-300 hover:underline" href="/forgot-password">
                  <span>Forgotten password?</span>
                </Link>
                <Link className="hover:text-red-300 hover:underline" href="/signup">
                  <span>Register</span>
                </Link>
              </div>
            </div></CardBody>
          </Card>
        </div>
      </div>
    </section>
  )
}
