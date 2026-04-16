// ================== IMPORTACIONES ==================


//Importa el modulo http para crear el servidor web
import http from 'node:http'


// Importa el modulo de archivos con promesas (permite usar async/await)
import fsp from 'node:fs/promises'

// Importa path para manejar rutas de archivos correctamente
import path  from 'node:path'

// ================== CREAR SERVIDOR ==================

// Se crea el servidor
// Esta función se ejecuta cada vez que alguien hace una petición
const app = http.createServer(async (peticion, respuesta) => {

    // ================== METODO GET ==================
    // GET se usa para obtener información

    if (peticion.method === 'GET') {

        // -------- RUTA RAIZ "/" --------
        if (peticion.url === '/') {

            // Código 200 = OK (todo salio bien)
            respuesta.statusCode = 200

            // Se envía la respuesta y se termina la ejecución
            return respuesta.end('ruta raiz / ')
        }

        // -------- RUTA "/usuarios" --------
        if (peticion.url === '/usuarios') {

            // Codigo 200 = OK
            respuesta.statusCode = 200

            // Respuesta para esta ruta
            return respuesta.end('ruta usuarios /usuarios ')
        }
    }



    // ================== METODO POST ==================
    // POST se usa para crear datos

    if (peticion.method === 'POST') {

        // Verifica que la ruta sea "/"
        if (peticion.url === '/') {

            // Define la ruta del archivo
            const ruta = path.join('./contenido.txt')

            // Crea o sobrescribe el archivo con este contenido
            await fsp.writeFile(ruta, 'contenido falso')

            // Respuesta indicando que se creo el recurso
            return respuesta.end('recurso creado')
        }
    }



    // ================== ERROR 404 ==================
    // Si no coincide ninguna ruta ni metodo

    respuesta.statusCode = 404

    // Mensaje de error ------FallBack------
    return respuesta.end('No se encontró la ruta')
})

// ================== INICIAR SERVIDOR ==================

// El servidor escucha en el puerto 3000
app.listen(3000, () => {

    // Mensaje en consola para saber que esta funcionando
    console.log('servidor escuchando en http://localhost:3000')
})
