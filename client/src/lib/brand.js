async function getBrands(token) {
  const res = await fetch('http://localhost:3900/api/v1/brands', {
    // cache: 'force-cache',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  })

  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }
  const data = await res.json()
  return data
}

async function createBrand({ data, token }) {
  return console.log(data, token)
  const res = await fetch('http://localhost:3900/api/v1/brands', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })

  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }

  return res.json()
}

export { getBrands, createBrand }
