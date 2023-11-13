import React, { Suspense } from 'react'
import appConfig from '../../config'

export const metadata = {
  title: appConfig.title + ' ' + '| Dashboard',
}

export default function DashboardLayout({ children }) {
  return (
    <section className="min-h-screen">
      <div className="container mx-auto py-5">
        <div className="grid grid-cols-1 gap-5">
          <Suspense fallback={'Loading...'}>{children}</Suspense>
        </div>
      </div>
    </section>
  )
}
