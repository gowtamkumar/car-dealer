import React from 'react'
import Image from 'next/image'

const loading = () => {
  return (
    <div className="flex min-h-[90vh] items-center justify-center">
      <Image src="/loading.gif" width={400} height={400} alt="loading.." />
    </div>
  )
}

export default loading
