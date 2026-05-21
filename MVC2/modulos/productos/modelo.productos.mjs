/*
Capa encargada de los datos
Por ejemplo, consultas a una base de datos local o externa
*/
import productos from '../../productos.mjs'

export function obtenerTodos() {
    /*
    Si tomamops los datos de un archivo JSON
    aquí estaria el readFile
    */
    return productos //<- como se entregan los datos
}











export function obtenerUno(id) {
    const id_producto = Number(id)
    const productosFiltrados = productos.datos.filter((producto) => {
        return Number(producto.id) === id_producto
    })
    // Arreglos
    return productosFiltrados
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