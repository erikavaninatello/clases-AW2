// Importamos el módulo fs/promises para trabajar con archivos (async/await)
import fsp from 'node:fs/promises'

// Importamos path para manejar rutas de forma segura
import path from 'node:path'

try {
  // Creamos la ruta del archivo
  const ruta = path.join('texto.txt')

  // Leemos el archivo (utf-8 para texto)
  const contenido = await fsp.readFile(ruta, 'utf8')

  // Mostramos el contenido en consola
  console.log(contenido)

} catch (e) {
  // Capturamos errores (por ejemplo: archivo no existe)
  console.log('Error al leer archivo:', e)
}