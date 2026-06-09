import './iniciar.env.mjs'
import express from 'express'
import path from 'node:path'
import rutasModuloProductos from './modulos/productos/rutas.productos.mjs'

const PUERTO = process.env.PUERTO || 3000

const app = express()

app.use(rutasModuloProductos)

// Servimos el frontend principal
app.use(express.static(path.resolve('./publico')))
// Servimos el panel admin
app.use('/admin', express.static(path.resolve('./front-crud')))
// Servimos los archivos subidos
app.use('/archivos', express.static(path.resolve('./archivos')))

app.listen(PUERTO, () => {
    console.log(`Servidor en http://localhost:${PUERTO}`)
})