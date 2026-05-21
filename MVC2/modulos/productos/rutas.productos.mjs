// import express from 'express'
import {Router} from 'express'
import * as controlador from './controlador.productos.mjs'

// Instanciamos
const rutasProductos = new Router()

// Obtener todos los productos
rutasProductos.get('/api/v1/productos', controlador.obtenerTodos)
rutasProductos.get('/api/v1/productos/:id', controlador.obtenerUno)
rutasProductos.delete('/api/v1/productos/:id', controlador.eliminarUno)

export default rutasProductos
