export default async function getProducts() {
  const res = await fetch('http://localhost:3900/api/v1/products')

  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }
  const data = await res.json()
  // console.log('🚀 ~ data:', data)
  return data
}
