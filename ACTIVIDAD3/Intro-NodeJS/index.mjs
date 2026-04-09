import path from 'node:path'
import { getUsers } from './services/api.js'
import { saveFile, readFile } from './services/file.js'

async function main() {
  try {
    // traer datos
    const users = await getUsers()

    // formatear
    const formatted = users.map(({ id, email, name }) => ({
      id,
      email,
      name
    }))

    // ruta
    const ruta = path.join(process.cwd(), 'txtEscuela.json')

    // guardar
    await saveFile(ruta, formatted)

    // leer
    const data = await readFile(ruta)

    // mostrar
    console.log(data)

  } catch (e) {
    console.log('error:', e)
  }
}

main()