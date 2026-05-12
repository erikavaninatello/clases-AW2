import express from 'express'

import productos from './productos.mjs'



const PUERTO = 3000

const app = express()
//OBTENER TODOS LOS PRODUCTOS

app.get('api/v1/productos', controlador.obtenerTodos)
app.get('api/v1/productos:id', controlador.obtenerUno)

app.listen(PUERTO)


/**
 * modulos
 *   |
 * productos
 *    |
 * BD ---> MODELO
 *     |
 * CONTROLADOR
 *     |
 * RESPUESTA
 */