import productos from "./productos.mjs"


export function obtenerProductos(req, res) {
    res.json(productos)
}


export function obtenerProducto(req, res) {
    // Logica previa
    const id_producto = Number(req.params.id)
    // Filter
    const productosFiltrados = productos.datos.filter((producto) => {
        return Number(producto.id) === id_producto
    })
    // Verificamos si hay elementos en el arreglo
    if (productosFiltrados.length > 0) {
        const respuesta = {
            datos: productosFiltrados,
            url: 'http://localhost:3000/api/v1/productos/' + id_producto,
            status: 200
        }
        res.json(respuesta)
    } else {
        res.status(404).json({
            mensaje: 'Producto no encontrado'
        })
    }
}

export function altaProducto(req, res){
    // recibo los datos convertidos a JS
    const producto = req.body

    // Genero una estructura para el producto a insertar
    const ultimoId = productos.ultimo_id + 1
    const productoFinal = {
        id: ultimoId,
        ...producto
    }
    // o
    // producto.id = ultimoId

    productos.datos.push(productoFinal)
    // Tenemos que modificar el id en la BD -> productos.mjs
    productos.ultimo_id = ultimoId
    // responder
    res.status(201).json({mensaje: 'se dio de alta el producto'})
}

export function modificarProducto(req, res){
    // Necesitamos saber el ID
    const id_producto = Number(req.params.id)
    // Necesitamos los datos del producto a modificar
    const nuevoProducto = req.body

    productos.datos.map((producto)=>{
        // Necesitamos saber la ubicacion dentro del arreglo del producto que queremos modificar
        // Necesitamos el índice
        if(Number(producto.id) === id_producto){
            const indice = productos.datos.indexOf(producto)
            console.log(productos.datos[indice])
            // Accedo al indice
            productos.datos[indice] = {
                id: id_producto,
                ...nuevoProducto
            }

            // productos.datos[indice].nombre = producto.nombre
            // productos.datos[indice].precio = ..
            // productos.datos[indice].imagen = ..
            // productos.datos[indice].id = ..
        }
    })
    res.json({mensaje: 'se modifico el producto con id ' + id_producto})

}

export function eliminarProducto(req, res) {
    // Logica previa
    const id_producto = Number(req.params.id)
    // Filter
    const productosFiltrados = productos.filter((producto) => {
        return Number(producto.id) !== id_producto
    })
    // Verificamos si hay elementos en el arreglo
    const respuesta = {
        datos: productosFiltrados,
        url: 'http://localhost:3000/api/v1/productos/' + id_producto,
        status: 200,
        verbo: 'DELETE'
    }
    res.json(respuesta)
}