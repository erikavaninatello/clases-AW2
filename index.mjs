




////IMPORTACIONES //
import http from 'node:http'
import path from 'node:path'


import {getUsers} from './services/api.js'
import{saveFile, readFile} from './services/file.js'

///VARIABLES//
 const FILE_PATH = path.join(process.cwd(), 'usuarios.json')

 //CREAR SERVIDOR//
  const app = http.createServer(async (peticion, respuesta) => {

    console.log(peticion.method, peticion.url) //agregado
       try {
        //metodo get//
        if(peticion.method === 'GET') {

          //RUTA USUARIOSD//
          if(peticion.url === '/usuarios') {
            
             //1.traer usuarios desde api//
             const users = await getUsers()
            
             //2.guardadlos en archivo
              await saveFile(FILE_PATH, users)
            
            //3.leer el archivo
              const data = await readFile(FILE_PATH)
            
            //4.responder al cliente
              respuesta.statusCode = 200
              respuesta.setHeader('Content-Type', 'application.json')
              
             return respuesta.end(JSON.stringify(data))
            }

            //ruta /usuarios/filtrado
            if(peticion.url === '/usuarios/filtrados') {

              //1.leer archivo
              const data = await readFile(FILE_PATH)

              //2.filtrar usuarios
               const filtrados = data.filter(u => u.id < 10)

               //3.respodnder

               respuesta.statusCode = 200
               respuesta.setHeader('Content-Type', 'application.json')

               return respuesta.end(JSON.stringify(filtrados))

            } }

            //error 404

            respuesta.statusCode = 404
            return respuesta.end('recurso no encontrado')
          } catch (error) {

            //error 500
            respuesta.statusCode = 500
            return respuesta.end('error interno del servidor')
    }
  })

  //iniciar servidor//
  app.listen(3000, () => {
    console.log('servidor en http://localhost:3000')

  })
 
  