import React from 'react'
import appConfig from '../../config'

export const metadata = {
  title: appConfig.title + ' ' + '| Dashboard',
}

export default function DashboardLayout({ children }) {
  return <section className="min-h-screen">{children}</section>
}
