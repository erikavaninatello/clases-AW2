import pool from '../../bd/conexion.bd.mjs'

export async function obtenerTodos() {
    const resultado = await pool.query('SELECT * FROM productos')
    return resultado
}

export async function crearUno(datos) {
    const { producto, precio, imagen } = datos  // desestructuración

    const resultado = await pool.query(
        `INSERT INTO productos(producto, precio)
         VALUES($1, $2)
         RETURNING id, producto, precio`,
        [producto, precio, imagen]
    )
    return resultado
}