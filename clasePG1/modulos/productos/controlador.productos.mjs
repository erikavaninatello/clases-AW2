import * as modelo from './modelo.productos.mjs'
import * as vista from './vista.productos.mjs'
export function obtenerTodos(req, res){
    // Obtenemos de capa modelo la funcion
    const productos = modelo.obtenerTodos()
    // En la vista modelamosla respuesta
    const respuesta = vista.obtenerTodos(productos)
    
    res.json(respuesta)
}









export function obtenerUno(req, res){
    // obtenemos el id del parametro
    const id_producto = req.params.id
    // Ejecutamos la funcion importada desde modelo
    const productos = modelo.obtenerUno(id_producto)
    // verificamos si hay producto, y respondemos en consecuencia
    if(productos.length > 0){
        res.json(productos)
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