import * as modelo from  './modelo.produtos.mjs'

export function obtenerTodos(req, res){

    //obtenemos de capa modelo de la funcion

 const productos = modelo.obtenerTodos()

 res.json(productos)
}
export function obtenerUno(req, res){
    const id_producto = req.params.id
    const producto = modelo.obtenerUno()
}