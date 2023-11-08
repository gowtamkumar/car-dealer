'use client'
import React from 'react'

export default function GlobalError({ error }) {
  return (
    <div className="flex h-[calc(100vh-160px)] w-full flex-col items-center justify-center gap-y-4">
      <h2 className=" text-destructive text-5xl font-bold">Oops, Something Went Wrong!</h2>
      <button onClick={() => reset()}>Try Again</button>
    </div>
  )
}
