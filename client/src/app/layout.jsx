import './globals.css'
import { Inter } from 'next/font/google'
import { appConfig } from '@/config'

import Footer from '@/components/layout/Footer'
import NavbarMenu from '@/components/layout/Header'

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
    icon: '/favicon.jpg',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  metadataBase: new URL(appConfig.url),
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={fontSans.variable}>
        <main>
          <div className="cscroll relative z-10 flex min-h-screen flex-col overflow-auto">
            <NavbarMenu />
            <main className="mt-14 flex-grow">{children}</main>
            <Footer />
          </div>
        </main>
      </body>
    </html>
  )
}
