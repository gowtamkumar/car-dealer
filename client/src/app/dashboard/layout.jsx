import React, { Suspense } from 'react'
import appConfig from '../../config'
import DashboardSidebar from '../../components/dashboard/DashboardSidebar'

export const metadata = {
  title: appConfig.title + ' ' + '| Dashboard',
}

export default function DashboardLayout({ children }) {
  return (
    <section className="min-h-[90vh]">
      <div className="container mx-auto py-5">
        <div className="grid grid-cols-12 gap-5">
          <DashboardSidebar />
          <div className="col-span-12 lg:col-span-9">
            <Suspense fallback={'Loading...'}>{children}</Suspense>
          </div>
        </div>
      </div>
    </section>
  )
}
