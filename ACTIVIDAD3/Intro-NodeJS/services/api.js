// services/api.js
export async function getUsers() {
  const res = await fetch('https://api.escuelajs.co/api/v1/users')
  return res.json()
}