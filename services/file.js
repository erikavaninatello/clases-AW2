//guardar y leer archivos
import fsp from 'node:fs/promises'

//guardar archivo

//funcion que guarda datos en un archivo JSON
export async function saveFile(ruta,data) {

// convierte el objeto de JS a texto JSON
const contenido =JSON.stringify(data, null, 2)

//escribe el archivo, lo crea o sobrescribe
await fsp.writeFile(ruta, contenido)
}



////LEER ARCHIVO//

//funcion que lee un archivo JSON
export async function readFile(ruta) {

    //lee el archivo como texto
    const data = await fsp.readFile(ruta, 'utf-8')

    //convierte el texto JSON  a objeto JS
    return JSON.parse(data)
    
}