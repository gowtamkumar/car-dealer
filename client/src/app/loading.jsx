'use client'
import Image from 'next/image'

export default function Loading() {
  // Or a custom loading skeleton component
  return (
    <div className="flex min-h-screen items-center justify-center">
      <Image src="/loading.gif" width={150} height={150} alt="loading.." />
    </div>
  )
}
