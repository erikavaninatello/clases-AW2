import express from 'express';

// importamos las funciones
import {
    obtenerProductos,
    obtenerProducto,
    eliminarProducto
} from './funciones.mjs';



// CONFIGURACIÓN DEL SERVIDOR

const app = express();

const PUERTO = 3000;

// RUTAS API REST



// GET -> obtener todos los productos
app.get('/api/v1/productos', obtenerProductos);


// GET -> obtener un producto por ID
app.get('/api/v1/productos/:id', obtenerProducto);


// DELETE -> eliminar producto por ID
app.delete('/api/v1/productos/:id', eliminarProducto);


// LEVANTAR SERVIDOR


app.listen(PUERTO, () => {

    console.log(`Servidor corriendo en http://localhost:${PUERTO}`);

});