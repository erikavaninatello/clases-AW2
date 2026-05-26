import * as modelo from './modelo.productos.mjs'
import * as vista from './vista.productos.mjs'
export async function obtenerTodos(req, res){
    // Obtenemos de capa modelo la funcion
    const productos = await modelo.obtenerTodos()
    // En la vista modelamosla respuesta
    const respuesta = vista.obtenerTodos(productos) //<---arreglo
    res.json(respuesta)
}


export async function obtenerUno(req, res){
    // obtenemos el id del parametro
    const id_producto = req.params.id
    // Ejecutamos la funcion importada desde modelo
    const productos = await modelo.obtenerUno(id_producto)
    // En la vista modelamosla respuesta
    const respuesta = vista.obtenerUno(productos) //<---arreglo
    console.log(respuesta)
    // verificamos si hay producto, y respondemos en consecuencia
    if(respuesta.length > 0){
        res.json(respuesta)
    }else{
        res.status(404).json({mensaje:'producto no encontrado'})
    }
}

export function eliminarUno(req, res){
    // Obtenemos de capa modelo la funcion
    // obtenemos el id del parametro
    const id_producto = req.params.id
    const productoEliminado = modelo.eliminarUno(id_producto)
    if(productoEliminado){
        res.json({mensaje:`Producto con id ${id_producto} eliminado`})
    }else{
        res.status(500).json({mensaje:`No se pudo eliminar el producto con id ${id_producto}`})

    }
}