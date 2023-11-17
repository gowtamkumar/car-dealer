'use client'
import React, { Suspense, useEffect } from 'react'
import NavbarMenu from '../../components/layout/Header'
import Footer from '../../components/layout/Footer'
import Loading from '../loading'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

// export const metadata = {
//   title: 'Dashboard',
// }

export default function DashboardLayout({ children }) {
  const router = useRouter()

  const session = useSession()
  if (session.status === 'unauthenticated') {
    router.push('/')
  }

  return (
    <section className="cscroll relative z-10 flex min-h-screen flex-col overflow-auto">
      <NavbarMenu />
      <main className="mt-14 flex-grow">
        <div className="container mx-auto min-h-[100vh] py-3">{children}</div>
      </main>
      <Footer />
    </section>
  )
}
