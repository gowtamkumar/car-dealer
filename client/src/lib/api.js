'use client'
import { getSession } from 'next-auth/react'

const BASE_URL = 'http://localhost:3900/api/v1'

async function Gets(params) {
  try {
    const { api } = params
    const session = await getSession()
    const res = await fetch(`${BASE_URL}/${api}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${session?.user?.token}`,
        'Content-Type': 'application/json',
      },
    })
    if (!res.ok) {
      console.log('Failed to fetch data')
    }
    const result = await res.json()
    return result
  } catch (error) {
    console.log('Failed to fetch data')
  }
}

async function Get(params) {
  try {
    const session = await getSession()
    const { api, id } = params
    const res = await fetch(`${BASE_URL}/${api}/${id}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${session?.user?.token}`,
        'Content-Type': 'application/json',
      },
    })
    if (!res.ok) {
      // This will activate the closest `error.js` Error Boundary
      console.log('Failed to fetch data')
    }
    const result = await res.json()
    return result
  } catch (error) {
    console.log('Failed to fetch data')
  }
}

async function GetProducts(params) {

  const { api, data } = params
  const {
    brandId,
    modelId,
    transmission,
    fuelType,
    noOfseat,
    color,
    maxPrice,
    minPrice,
    search,
    lowPrice,
    highPrice
  } = data

  // const lowPrice = false
  // const highPrice = true
  // const search = ""

  let queryString = '';

  if (brandId?.length > 0) {
    queryString += `brandId=${brandId.join(',')}${brandId && '&'}`
  }

  if (modelId?.length > 0) {
    queryString += `modelId=${modelId.join(',')}${modelId && '&'}`
  }

  if (transmission?.length > 0) {
    queryString += `transmission=${transmission.join(',')}${transmission && '&'}`
  }
  if (fuelType?.length > 0) {
    queryString += `fuelType=${fuelType.join(',')}${fuelType && '&'}`
  }

  if (noOfseat?.length > 0) {
    queryString += `noOfseat=${noOfseat.join(',')}${noOfseat && '&'}`
  }

  if (maxPrice) {
    queryString += `maxPrice=${maxPrice}&`
  }

  if (minPrice) {
    queryString += `minPrice=${minPrice}&`
  }

  if (lowPrice) {
    queryString += `lowPrice=${lowPrice}&`
  }

  if (highPrice) {
    queryString += `highPrice=${highPrice}&`
  }

  if (search) {
    queryString += `search=${search}&`
  }

  if (color?.length > 0) {
    queryString += `color=${color.join(',')}${color && '&'}`
  }


  console.log("queryString:", queryString)

  try {
    const res = await fetch(`${BASE_URL}/${api}?${queryString}`)
    if (!res.ok) {
      console.log('Failed to fetch data')
    }
    const result = await res.json()
    return result
  } catch (error) {
    console.log('Failed to fetch data')
  }
}

async function Create(params) {
  try {
    const session = await getSession()
    const { api, data } = params
    // return console.log('api')
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
  } catch (error) {
    console.log('Failed to fetch data')
  }
}

async function Update(params) {
  const session = await getSession()
  const { api, data } = params
  const { id } = data
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

async function Delete(params) {
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
  const res = await fetch('http://localhost:3900/api/v1/files/uploads', {
    method: 'POST',
    body: data,
  })

  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }
  return res.json()
}


export { Gets, Get, Create, Update, Delete, CreateFile, GetProducts }
