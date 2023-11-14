'use client'
import { Button, Input } from '@material-tailwind/react'
import Link from 'next/link'
import React, { useState } from 'react'

const LoginPage = () => {
  const [data, setData] = useState({})

  const handleChange = (type, target) => {
    console.log('type, value:', type, target.value)
    setData({ ...data, [type]: target.value })
  }

  const handleSubmit = () => {
    console.log('data:', data)
  }

  return (
    <div className="p-0">
      <div className="my-5">
        <Input
          onChange={({ target }) => handleChange('username', target)}
          variant="standard"
          label="Username"
        />
      </div>
      <div className="my-5">
        <Input
          onChange={({ target }) => handleChange('password', target)}
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
        <Link className="hover:text-red-300 hover:underline" href="/auth/forgot-password">
          <span>Forgotten password?</span>
        </Link>
        <Link className="hover:text-red-300 hover:underline" href="/auth/signup">
          <span>Register</span>
        </Link>
      </div>
    </div>
  )
}

export default LoginPage
