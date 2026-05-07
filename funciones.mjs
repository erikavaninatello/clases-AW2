import productos from './productos.mjs';



// OBTENER TODOS LOS PRODUCTOS

export function obtenerProductos(req, res) {

    // devuelve todo el array en formato JSON
    res.json(productos);
}



// OBTENER UN PRODUCTO POR id

export function obtenerProducto(req, res) {

    // obtenemos el id desde la URL
    // ejemplo: /api/v1/productos/2
    const id_producto = Number(req.params.id);

    // filtramos el producto que coincida con el ID
    const productosFiltrados = productos.filter((producto) => {

        return Number(producto.id) === id_producto;

    });

    // verificamos si encontró algún producto
    if (productosFiltrados.length > 0) {

        const respuesta = {

            datos: productosFiltrados,
            url: 'http://localhost:3000/api/v1/productos/' + id_producto,
            status: 200

        };

        res.json(respuesta);

    } else {

        // si no existe devuelve error 404
        res.status(404).json({

            mensaje: 'Producto no encontrado'

        });

    }

}




// ELIMINAR PRODUCTO

export function eliminarProducto(req, res) {

    // obtenemos el id desde la URL
    const id_producto = Number(req.params.id);

    // filtramos todos MENOS el producto eliminado
    const productosFiltrados = productos.filter((producto) => {

        return Number(producto.id) !== id_producto;

    });

    const respuesta = {

        datos: productosFiltrados,
        url: 'http://localhost:3000/api/v1/productos/' + id_producto,
        status: 200,
        verbo: 'DELETE'

    };

    res.json(respuesta);

}