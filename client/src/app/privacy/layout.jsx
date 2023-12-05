import Footer from '@/components/layout/Footer'
import NavbarMenu from '@/components/layout/Header'
import React, { Suspense } from 'react'
import Loading from '../loading'

const layout = ({ children }) => {
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

export default layout