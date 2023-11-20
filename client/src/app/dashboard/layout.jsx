'use client'
import React, { Suspense } from 'react'
import NavbarMenu from '../../components/layout/Header'
import Footer from '../../components/layout/Footer'
import { useSession } from 'next-auth/react'
import { usePathname, useRouter } from 'next/navigation'
import Loading from '../loading'

export default function DashboardLayout({ children }) {
  const router = useRouter()
  const pathname = usePathname()
  const session = useSession()

  if (session.status === 'unauthenticated') {
    router.push('/')
  }

  if (session?.data?.user?.role === 'Seller') {
    pathname === '/dashboard/brand' && router.push('/')
    pathname === '/dashboard/model' && router.push('/')
    pathname === '/dashboard/model-code' && router.push('/')
    pathname === '/dashboard/user' && router.push('/')
  }

  if (session?.data?.user?.role === 'Operator') {
    pathname === '/dashboard/user' && router.push('/')
  }

  return (
    <section className="cscroll relative z-10 flex min-h-screen flex-col overflow-auto">
      <NavbarMenu />
      <main className="mt-14 flex-grow">
        <div className="container mx-auto min-h-[100vh] py-3">
          <Suspense fallback={<Loading />}>{children}</Suspense>
        </div>
      </main>
      <Footer />
    </section>
  )
}
