/// Primero importar el modulo para crear el servidor
import http from 'node:http'

//para importar el modulo del archivo 
import fsp from 'node:fs/promises'

//maneja rutas del archivo correctamente
 const PORT = 3000
 const FILE_PATH ='./usuarios.json'

 //traer datos de api externa

 async function obtenerUsuarios() {
    const res = await fetch('https://api.escuelajs.co/api/v1/users')
    return res.json()
    
 }

 //guardar usuarios

 async function guardarUsuarios(data) {
    await fsp.writeFile(FILE_PATH, JSON.stringify(data, null, 2))
}


 //para leer el archivo
 async function leerUsuarios(){
    const data = await fsp.readFile(FILE_PATH, 'utf-8')
  return JSON.parse(data)

 }


// servidor
const app = http.createServer(async (peticion, respuesta) => {
  try {

    //  /usuarios
    if (peticion.method === 'GET' && peticion.url === '/usuarios') {

      const usuarios = await obtenerUsuarios()
      await guardarUsuarios(usuarios)

      const data = await leerUsuarios()

      respuesta.statusCode = 200
      respuesta.setHeader('Content-Type', 'application/json')

      return respuesta.end(JSON.stringify(data))
    }

    // /usuarios/filtrados
    if (peticion.method === 'GET' && peticion.url === '/usuarios/filtrados') {

      const data = await leerUsuarios()
      const filtrados = data.filter(u => u.id < 10)

      respuesta.statusCode = 200
      respuesta.setHeader('Content-Type', 'application/json')

      return respuesta.end(JSON.stringify(filtrados))
    }

    // error
    respuesta.statusCode = 404
    return respuesta.end('Recurso no encontrado')

  } catch (error) {
    respuesta.statusCode = 500
    return respuesta.end('Error interno del servidor')
  }
})

// levantar servidor
app.listen(3000, () => {

    // Mensaje en consola para saber que esta funcionando
    console.log('servidor escuchando en http://localhost:3000')
})