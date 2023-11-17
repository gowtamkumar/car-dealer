export default async function createFile(data) {
  const res = await fetch('http://localhost:3900/api/v1/files/uploads', {
    method: 'POST',
    body: data,
  })

  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }
  return res.json()
}
