import multer from 'multer'
import path from 'node:path'
import * as modelo from './modelo.productos.mjs'

// Configuramos Multer — destino simple sin diskStorage
const subirArchivo = multer({ dest: path.join('archivos') })
const manejarArchivo = subirArchivo.single('archivo')

export async function obtenerTodos(req, res) {
    const respuesta = await modelo.obtenerTodos()
    const respuestaDatos = respuesta.rows
    res.json(respuestaDatos)
}

export async function crearUno(req, res) {
    manejarArchivo(req, res, async (error) => {
        if (error) return res.status(500).json({ mensaje: 'error en el servidor' })

        const datos = {
            producto: req.body.producto,
            precio: req.body.precio,
            imagen: req.file.originalname
        }

        const respuesta = await modelo.crearUno(datos)
        res.status(201).json({ mensaje: 'Registro creado' })
    })
}
//aca vive multer ahora