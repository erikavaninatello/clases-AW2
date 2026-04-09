// services/file.js
import fsp from 'node:fs/promises'

export async function saveFile(ruta, data) {
  await fsp.writeFile(ruta, JSON.stringify(data, null, 2), 'utf-8')
}

export async function readFile(ruta) {
  const data = await fsp.readFile(ruta, 'utf-8')
  return JSON.parse(data)
}