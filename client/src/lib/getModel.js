export default async function getModel(token) {
  const res = await fetch('http://localhost:3900/api/v1/models', {
    // cache: 'default',
    // next: { revalidate: 10 },
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
