import fsp from 'node:fs/promises'
import path from 'node:path'

try {
  // 1. Hacemos petición a la API
  const respuesta = await fetch('https://69cbcc300b417a19e07b450e.mockapi.io/Api1/Producto')

  // 2. Convertimos a JSON (objeto JS)
  const productos = await respuesta.json()

  // 3. Creamos ruta del archivo donde guardar
  const ruta = path.join('datosAPI.json')

  // 4. Convertimos a JSON string (formateado)
  const datosGuardar = JSON.stringify(productos, null, 2)

  // 5. Guardamos en archivo
  await fsp.writeFile(ruta, datosGuardar)

  console.log('Datos de API guardados correctamente')

} catch (e) {
  console.log('Error al consumir API:', e)
}