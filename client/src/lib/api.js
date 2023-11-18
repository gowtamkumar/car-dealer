'use client'
import { getSession } from 'next-auth/react'

const BASE_URL = 'http://localhost:3900/api/v1'

async function Gets(params) {
  const session = await getSession()
  const resp = await fetch(`${BASE_URL}/${params}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${session?.user?.token}`,
      'Content-Type': 'application/json',
    },
  })

  const result = await resp.json()
  return result
}

async function Get({ params }) {
  const session = await getSession()
  const { api, id } = params
  const resp = await fetch(`${BASE_URL}/${api}/${id}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${session?.user?.token}`,
      'Content-Type': 'application/json',
    },
  })

  const result = await resp.json()
  return result
}

async function Create({ params }) {
  const session = await getSession()
  const { api, data } = params
  const resp = await fetch(`${BASE_URL}/${api}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${session?.user?.token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })

  const result = await resp.json()

  return result
}

async function Update({ params }) {
  const session = await getSession()
  const { api, data, id } = params
  const resp = await fetch(`${BASE_URL}/${api}/${id}`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${session?.user?.token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })

  const result = await resp.json()
  return result
}

async function Delete({ params }) {
  const session = await getSession()
  const { api, id } = params
  const resp = await fetch(`${BASE_URL}/${api}/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${session?.user?.token}`,
    },
  })
  const result = await resp.json()
  return result
}

export default async function CreateFile(data) {
  const session = await getSession()
  const res = await fetch(`${BASE_URL}/files/${api}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${session?.user?.token}`,
    },
    body: data,
  })

  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }
  const result = await res.json()
  return result
}

export { Gets, Get, Create, Update, Delete, CreateFile }
