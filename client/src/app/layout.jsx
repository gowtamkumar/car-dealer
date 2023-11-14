// Prime React
import 'primereact/resources/themes/lara-light-indigo/theme.css'
import 'primereact/resources/primereact.min.css'
import 'primeicons/primeicons.css'
import './globals.css'

import { Inter } from 'next/font/google'
import { Suspense } from 'react'
import { appConfig } from '../config'

import Loading from './loading'

const fontSans = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
})

export const metadata = {
  title: appConfig.title,
  description: appConfig.description,
  keywords: ['Car'],
  authors: [
    {
      name: appConfig.author.name,
      url: appConfig.author.website,
    },
  ],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: appConfig.url,
    title: appConfig.title,
    description: appConfig.description,
    siteName: appConfig.name,
    images: [],
  },
  icons: {
    icon: '/favicon.ico',
    // shortcut: '/favicon-16x16.png',
    // apple: '/apple-touch-icon.png',
  },
  metadataBase: new URL(appConfig.url),
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true} className={fontSans.variable}>
        <Suspense fallback={<Loading />}>{children}</Suspense>
      </body>
    </html>
  )
}
