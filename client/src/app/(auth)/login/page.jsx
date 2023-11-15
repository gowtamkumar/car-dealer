'use client'
import { Card, Input, Checkbox, Button, Typography } from '@material-tailwind/react'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { signIn, signOut, getSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

export default function Login() {
  const [data, setData] = useState({})
  const [error, setError] = useState({})
  const router = useRouter()

  useEffect(() => {
    ;(async () => {
      const session = await getSession()
      console.log('🚀 ~ new sesson:', session)
      if (session) {
        router.push('/')
      }
    })()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    // return console.log('login', data)

    const { username, password } = data

    try {
      const result = await signIn('credentials', {
        username,
        password,
        redirect: false,
      })
      // console.log('🚀 ~ result:', result)
      if (result.error) {
        setError(result)
      }
      if (result.status === 200) {
        setTimeout(() => {
          router.push('/')
        }, 1000)
      }
    } catch (err) {
      console.log('error s')
    }
  }

  return (
    <>
      <div className="flex h-screen items-center justify-center">
        <Card color="transparent" shadow={false}>
          <Typography variant="h4" color="blue-gray">
            SignIn
          </Typography>
          <Typography color="gray" className="mt-1 font-normal">
            Enter your details to Login.
          </Typography>
          <form className="mb-2 mt-8 w-80 max-w-screen-lg sm:w-96">
            <div className="mb-4 flex flex-col gap-6">
              <Input
                size="lg"
                label="User Name"
                name="username"
                onChange={({ target }) => setData({ ...data, [target.name]: target.value })}
              />
              {/* <Input size="lg" label="Email" /> */}
              <Input
                type="password"
                size="lg"
                name="password"
                label="Password"
                onChange={({ target }) => setData({ ...data, [target.name]: target.value })}
              />
            </div>
            {error.error && <span>{error.error}</span>}
            <Checkbox
              label={
                <Typography variant="small" color="gray" className="flex items-center font-normal">
                  I agree the
                  <Link href="#" className="font-medium transition-colors hover:text-gray-900">
                    &nbsp;Terms and Conditions
                  </Link>
                </Typography>
              }
              containerProps={{ className: '-ml-2.5' }}
            />
            <Button className="mt-6" fullWidth onClick={handleSubmit}>
              Login
            </Button>
            <Typography color="gray" className="mt-4 text-center font-normal">
              don,t have an account? <Link href="/signup">Sing Up</Link>
            </Typography>
          </form>
        </Card>
      </div>

      {/* <div className="flex h-screen items-center justify-center">
        <div
          className="d-flex justify-content-center align-items-center bg-light container"
          style={{ height: '80vh' }}
        >
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Username
              </label>
              <input
                type="text"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                name="username"
                placeholder="Username"
                onChange={({ target }) => setData({ ...data, [target.name]: target.value })}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">
                Password
              </label>
              <input
                type="password"
                name="password"
                className="form-control"
                id="exampleInputPassword1"
                placeholder="password"
                onChange={({ target }) => setData({ ...data, [target.name]: target.value })}
              />
            </div>
            <div className="form-check mb-3">
              <input type="checkbox" className="form-check-input " id="exampleCheck1" />
              <label className="form-check-label" htmlFor="exampleCheck1">
                Check me out
              </label>
            </div>
            {error.error && <span>{error.error}</span>}
            <br />
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
        </div>
      </div> */}
    </>
  )
}
