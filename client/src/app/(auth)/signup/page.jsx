'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Card, Input, Button, Typography, CardHeader, CardBody } from '@material-tailwind/react'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'
import { getSession } from 'next-auth/react'
import { createUser } from '../../../lib/createUser'

export default function Signup() {
  const [data, setData] = useState({})
  const router = useRouter()

  // redirect home page
  // const session = useSession()
  // if (session.status === 'authenticated') {
  //   router.push('/')
  // }

  useEffect(() => {
    (async () => {
      const newSession = await getSession()
      if (newSession?.token) {
        router.push('/')
      }
    })()
  }, [])


  // create new user
  const handleSubmit = async (e) => {
    e.preventDefault()
    // return console.log(data);
    try {
      const result = await createUser(data)
      if (result.statusCode === 400) {
        return toast.error('Password must be 8 to 20 characters')
      }
      if (result.statusCode === 404) {
        return toast.error(result.errors)
      }

      if (result.success) {
        toast.success('Registered Successfully')
        setTimeout(() => {
          window.location.replace('/login')
        }, 1000)
      }
    } catch (err) {
      console.log(err)
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
                Sign up as a Seller
              </Typography>
            </CardHeader>
            <CardBody>
              <form autoComplete='false' onSubmit={handleSubmit}>
                <div className="p-0">
                  <div className="my-5">
                    <Input
                      onChange={({ target }) => setData({ ...data, [target.name]: target.value })}
                      variant="standard"
                      label="Name"
                      name='name'
                      required
                    />
                  </div>
                  <div className="my-5">
                    <Input
                      onChange={({ target }) => setData({ ...data, [target.name]: target.value })}
                      variant="standard"
                      label="Username"
                      name='username'
                      required
                    />
                  </div>
                  <div className="my-5">
                    <Input
                      onChange={({ target }) => setData({ ...data, [target.name]: target.value })}
                      variant="standard"
                      label="Password"
                      type="password"
                      name='password'
                      required
                    />
                  </div>
                  <div className="my-5">
                    <Input
                      onChange={({ target }) => setData({ ...data, [target.name]: target.value })}
                      variant="standard"
                      label="Contact No."
                      name='phone'
                      required
                    />
                  </div>
                  <div className="my-5">
                    <Input
                      onChange={({ target }) => setData({ ...data, [target.name]: target.value })}
                      variant="standard"
                      label="Email"
                      name='email'
                    />
                  </div>
                  <div className="my-5">
                    <Button type='submit' fullWidth variant="gradient" color="red">
                      Register
                    </Button>
                  </div>
                  <hr />
                  <div className="my-3 flex items-center justify-between">
                    <Link className="hover:text-red-300 hover:underline" href="/login">
                      <span>Login</span>
                    </Link>
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
// <div className="flex h-screen items-center justify-center">
//   <Card color="transparent" shadow={false}>
//     <Typography variant="h4" color="blue-gray">
//       Sign Up
//     </Typography>
//     <Typography color="gray" className="mt-1 font-normal">
//       Enter your details to register.
//     </Typography>
//     <form onSubmit={handleSubmit} className="mb-2 mt-8 w-80 max-w-screen-lg sm:w-96">
//       <div className="mb-4 flex flex-col gap-6">
//         <Input
//           size="md"
//           label="Name"
//           name="name"
//           value={data.name || ''}
//           required
//           onChange={({ target }) => setData({ ...data, [target.name]: target.value })}
//         />
//         <Input
//           size="md"
//           label="Username"
//           required
//           value={data.username || ''}
//           name="username"
//           onChange={({ target }) => setData({ ...data, [target.name]: target.value })}
//         />
//         <Input
//           type="password"
//           size="md"
//           required
//           label="Password"
//           value={data.password || ''}
//           name="password"
//           onChange={({ target }) => setData({ ...data, [target.name]: target.value })}
//         />

//         <Input
//           size="md"
//           type="email"
//           label="Email"
//           value={data.email || ''}
//           name="email"
//           onChange={({ target }) => setData({ ...data, [target.name]: target.value })}
//         />
//       </div>
//       {/* <Checkbox
//         label={
//           <Typography variant="small" color="gray" className="flex items-center font-normal">
//             I agree the
//             <Link href="#" className="font-medium transition-colors hover:text-gray-900">
//               &nbsp;Terms and Conditions
//             </Link>
//           </Typography>
//         }
//         containerProps={{ className: '-ml-2.5' }}
//       /> */}

//       <Button type="submit" className="mt-6" fullWidth>
//         Register
//       </Button>
//       <Typography color="gray" className="mt-4 text-center font-normal">
//         Already have an account? <Link href="/login">Sign In </Link>
//       </Typography>
//     </form>
//   </Card>
// </div>
