import React from 'react'
import appConfig from '../../config'

export const metadata = {
  title: appConfig.title + ' ' + '| Product',
}

export default function ProductLayout({ children }) {
  return <section className="min-h-screen">{children}</section>
}
