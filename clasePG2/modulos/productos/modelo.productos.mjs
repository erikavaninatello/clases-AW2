import pg from '../../conexion.bd.mjs'
/*
Capa encargada de los datos
Por ejemplo, consultas a una base de datos local o externa
*/

export async function obtenerTodos() {
    const resultado = await pg.query('SELECT * FROM productos') //<-- devuelve un objeto Result
    // console.log(resultado)
    return resultado.rows //<- como se entregan los datos
}


export async function obtenerUno(id) {
    const id_producto = Number(id)
    const resultado = await pg.query('SELECT * FROM productos WHERE id=$1',[id_producto])
    return resultado.rows
}
export function eliminarUno(id) {
    const id_producto = Number(id)
    // Guardo la cantidad de elementos previo al borrado
    const catidadItemsArreglo = productos.datos.length
    productos.datos.forEach((producto, indice) => {
        if(Number(producto.id) === id_producto){
            // Ellimina un elemento del arreglo
            productos.datos.splice(indice, 1)
        }
    })
    // Chequeo si se elimino comparando  las longitudes de los arreglos
    // Arreglos
    if(catidadItemsArreglo > productos.datos.length){
        return true
    }else{
        return false
    }
}