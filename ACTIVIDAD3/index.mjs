/*import path from 'node:path'
    const res = await fetch('https://api.escuelajs.co/api/v1/users')
    const escuela = await repuesta.json()

 const ruta = path.json('txtEscuelajs')
 
 async function main() {
  console.log("");
 

  //Obtener y formatear usuarios desde l api
 // console.log("");
  //const users = await fetchUsers();
 // console.log(``);
 }
*/


import path from 'node:path'
import fsp from 'node:fs/promises'
// 1. Petición a la api
async function main() {

  const res = await fetch('https://api.escuelajs.co/api/v1/users')
  const escuela = await res.json()

// formatear solo id, email y name
  const formatted = escuela.map(({ id, email, name }) => ({ id, email, name }))

//guardar
  try {
    const ruta = path.join('txtEscuela.json')
    await fsp.writeFile(ruta, JSON.stringify(formatted, null, 2), 'utf-8')
    console.log('archivo guardado')
  } catch (e) {
    console.log(e)
  }
}

main()