export async function createUser(data) {
  const res = await fetch('http://localhost:3900/api/v1/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })

  return res.json()
}
