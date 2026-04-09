async function obtenerDatos() {
    const repuesta = await fetch('https://69cbcb850b417a19e07b42f7.mockapi.io/api/v1/Productos')
    const productos = await repuesta.json()

    console.log(productos)
    renderizar(productos)
}

obtenerDatos()


function renderizar(productosArray){
    let plantilla = ''
    let $contenedor = document.getElementById('contenedor')

    productosArray.forEach((producto) => {
        let HTML = `
            <article class="producto">
                <h3 class="nombre">${producto.nombre}</h3>
                <data class="precio" value="100">Precio: ${producto.precio}</data>
                <data class="stock" value="10">Stock: ${producto.stock}</data>
                <data class="marca">${producto.marca}</data>
            </article>
        `
        plantilla += HTML
    });

    $contenedor.innerHTML = plantilla
}


