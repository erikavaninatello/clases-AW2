/*capa encargada de los datos x ej : consultas a una bdd local o externa */

import productos from 'express.mjs'

export function obtenerTodos () {

    /*si tomamos los datos d eun archivo JSON auqi etaria el readfile*/

   return productos 
}

export function obtenerUno(){
    
    const id_producto = Number(id)

    productos.datos.filter((producto) =>{

        return Number (producto.id) === id

    })

}

