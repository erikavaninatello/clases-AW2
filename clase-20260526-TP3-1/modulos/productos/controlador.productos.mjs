import * as modelo from './modelo.productos.mjs'

export async function obtenerTodos(req, res) {
    const respuesta = await modelo.obtenerTodos()
    const respuestaDatos = respuesta.rows
    res.json(respuestaDatos)
}