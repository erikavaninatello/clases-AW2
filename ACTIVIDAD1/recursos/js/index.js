//1- declarar la funcion obtenerDatos 
//2- utilizar fetch 
//3- mostrar por consola

async function obtenerDatos(){
    const respuesta = await fetch("./recursos/datos/productos.json")
    const productos = await respuesta.json()
    console.log(productos)
}

obtenerDatos()

function renderizarProductos(productos, contenedor)
{
    let html = ""
    productos.forEach(producto => {
        const plantilla = `<article class="producto">
                <h3 class="nombre">Producto 1</h3>
                <data class="precio" value="100">Precio: $100</data>
                <data class="stock" value="10">Stock: 10</data>
            </article>`
    html += plantilla
    });
    
    contenedor.innerHTML = html

}