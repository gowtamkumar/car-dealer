import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

const NotFoundPage = () => {
  return (
    <div className="flex min-h-[90vh] flex-col items-center justify-center gap-3">
      <Image className="block" src="/svg/not-found.svg" width={250} height={250} />
      <div>The requested page doesn&apos;t exist.</div>
      <Link className="hover:underline" href="/">
        Go To Home
      </Link>
    </div>
  )
}

export default NotFoundPage
