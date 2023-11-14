import React, { Suspense } from 'react'
import appConfig from '../../config'
import NavbarMenu from '../../components/layout/Header'
import Footer from '../../components/layout/Footer'
import Loading from '../loading'

export const metadata = {
  title: appConfig.title + ' ' + '| Dashboard',
}

export default function DashboardLayout({ children }) {
  return (
    <section className="cscroll relative z-10 flex min-h-screen flex-col overflow-auto">
      <NavbarMenu />
      <main className="mt-14 flex-grow">
        <div className="container mx-auto">
          <Suspense fallback={<Loading />}>{children}</Suspense>
        </div>
      </main>
      <Footer />
    </section>
  )
}
