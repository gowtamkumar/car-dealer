// Prime React

import 'primereact/resources/themes/lara-light-indigo/theme.css'
import 'primereact/resources/primereact.min.css'
import 'primeicons/primeicons.css'
import './globals.css'

import { Inter } from 'next/font/google'
import { Suspense } from 'react'
import { appConfig } from '../config'

import Loading from './loading'
// import { getServerSession } from 'next-auth'
import AuthProvider from '../lib/SessionProvider'
import { getServerSession } from 'next-auth'
import { authOptions } from './api/auth/[...nextauth]/route'

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

export default async function RootLayout({ children }) {
  const session = await getServerSession(authOptions)
  console.log('🚀 ~  session:', session)
  return (
    <html lang="en">
      <body suppressHydrationWarning={true} className={fontSans.variable}>
        <AuthProvider session={session}>
          <Suspense fallback={<Loading />}>{children}</Suspense>
        </AuthProvider>
      </body>
    </html>
  )
}
