export default async function getBrands(token) {
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
