'use client'
import React from 'react'
import { Card, CardHeader, CardBody, Typography } from '@material-tailwind/react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'

export default function AuthLayout({ children }) {
  const pathname = usePathname()

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
                {pathname === '/auth/login' ? 'Login' : 'Sign up'} as a Seller
              </Typography>
            </CardHeader>
            <CardBody>{children}</CardBody>
          </Card>
        </div>
      </div>
    </section>
  )
}
