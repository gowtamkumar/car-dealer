'use client'
import { useState } from 'react'
import Link from 'next/link'
import { Card, Input, Checkbox, Button, Typography } from '@material-tailwind/react'
import Router from 'next/router'
// import { useRouter } from 'next/navigation'

export default function Signup() {
  const [data, setData] = useState({})
  // const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log('dsd')
    try {
      const res = await fetch('http://localhost:3900/api/v1/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
      const result = await res.json()
      if (result.success) {
        window.location.replace('/login')
      }
    } catch (err) {
      console.log('error s')
    }
  }

  return (
    <div className="flex h-screen items-center justify-center">
      <Card color="transparent" shadow={false}>
        <Typography variant="h4" color="blue-gray">
          Sign Up
        </Typography>
        <Typography color="gray" className="mt-1 font-normal">
          Enter your details to register.
        </Typography>
        <form className="mb-2 mt-8 w-80 max-w-screen-lg sm:w-96">
          <div className="mb-4 flex flex-col gap-6">
            <Input
              size="lg"
              label="Name"
              name="name"
              onChange={({ target }) => setData({ ...data, [target.name]: target.value })}
            />
            <Input
              size="lg"
              label="Username"
              name="username"
              onChange={({ target }) => setData({ ...data, [target.name]: target.value })}
            />
            <Input
              type="password"
              size="lg"
              label="Password"
              name="password"
              onChange={({ target }) => setData({ ...data, [target.name]: target.value })}
            />

            <Input
              size="lg"
              type="email"
              label="Email"
              name="email"
              onChange={({ target }) => setData({ ...data, [target.name]: target.value })}
            />
          </div>
          {/* <Checkbox
            label={
              <Typography variant="small" color="gray" className="flex items-center font-normal">
                I agree the
                <Link href="#" className="font-medium transition-colors hover:text-gray-900">
                  &nbsp;Terms and Conditions
                </Link>
              </Typography>
            }
            containerProps={{ className: '-ml-2.5' }}
          /> */}
          <Button className="mt-6" fullWidth onClick={handleSubmit}>
            Register
          </Button>
          <Typography color="gray" className="mt-4 text-center font-normal">
            Already have an account? <Link href="/login">Sign In </Link>
          </Typography>
        </form>
      </Card>
    </div>
  )
}
