import express from 'express'
import * as controlador from './modulos/productos/controlador.productos.mjs'

const PUERTO = 3000

const app = express()

// Obtener todos los productos
app.get('/api/v1/productos', controlador.obtenerTodos)
app.get('/api/v1/productos/:id', controlador.obtenerUno)
app.delete('/api/v1/productos/:id', controlador.eliminarUno)


app.listen(PUERTO)