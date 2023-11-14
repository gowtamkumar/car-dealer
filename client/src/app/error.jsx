'use client' // Error components must be Client Components

import { Button } from '@material-tailwind/react'
import Image from 'next/image'
import { useEffect } from 'react'

export default function Error({ error, reset }) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  return (
    <div className="flex min-h-[90vh] flex-col items-center justify-center gap-3">
      <Image className="block" src="/svg/error.svg" width={250} height={250} />
      <h1 className="text-2xl">Something went wrong!</h1>
      <Button variant="text" color="red" onClick={() => reset()}>
        Try again
      </Button>
    </div>
  )
}
