import fsp from 'node:fs/promises'
import path from 'node:path'

try {
  // Definimos la ruta del archivo
  const ruta = path.join('texto.txt')

  // Escribimos contenido en el archivo (lo crea si no existe)
  await fsp.writeFile(ruta, 'Nuevo contenido generado desde Node.js')

  console.log('Archivo creado/escrito correctamente')

} catch (e) {
  console.log('Error al escribir archivo:', e)
}