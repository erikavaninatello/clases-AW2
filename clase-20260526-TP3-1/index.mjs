import './iniciar.env.mjs'   // siempre primero
import express from 'express'
import rutasModuloProductos from './modulos/productos/rutas.productos.mjs'

const PUERTO = process.env.PUERTO || 3000

const app = express()
app.use(rutasModuloProductos)

app.listen(PUERTO, () => {
    console.log(`Servidor en http://localhost:${PUERTO}`)
})