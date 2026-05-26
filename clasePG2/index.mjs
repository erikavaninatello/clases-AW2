import express from 'express'
import rutasProductos from './modulos/productos/rutas.productos.mjs'

const PUERTO = 3000

const app = express()
// /api/v1
// /v1
// /

app.use(rutasProductos)




app.listen(PUERTO)