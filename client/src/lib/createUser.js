export async function createUser(data) {
  const res = await fetch(`${process.env.NEXT_SERVER_URL}/api/v1/users'`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
  return res.json()
}
