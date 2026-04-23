//importamos express
//express es un framework de node.js para crear servidores web

import express from 'express';

//definimos el puerto donde va a funcionar el seervidor
const puerto = 3000;

//creamos la aplcicaion servidor
const app = express();
// Le decimos a Express:
// "Si el cliente manda datos en formato JSON,
// convertímelos automáticamente a objeto JavaScript"

// Ejemplo:
// Cliente manda:
// {
//   "id": 3,
//   "nombre": "camiseta"
// }

// Express lo transforma en:
// req.body = { id: 3, nombre: "camiseta" }

app.use(express.json());

const productos = [
    {
        id: 1,
        nombre: 'Producto 1',
        precio: 100
    },
    {
        id: 2,
        nombre: 'Producto 2',
        precio: 200
    }
];

//RUTA PRINCIPAL "/"

//funcion separada 
const obtenerRaiz = (req, res) => {
    //respondee text plane
    res.end('Hola en la raíz');
};

//cuando alguien entra al local host 3000
app.get('/', obtenerRaiz);

//GET /usuarios
app.get('/usuarios',(req,res) => {
    const miObjeto = {
        id:1,
    };
    //envia codigo http = todo bien
    res.sendStatus(200);

    //si quisiera enviar JSON:
    //res.json(miObjeto);
});


//GET /productos
//devuelve todos los productos
app.get('/productos',(req,res) => {

    //res.json convierte automaticamente a json
    res.json(productos);
});


//GET /productos/id
// :id = parámetro dinnamicop

app.get('/productos/:id', (req, res) => {

    // req.params.id viene como texto
    // lo convertimos a nro
    const id = parseInt(req.params.id);

    // buscamos productos con ese id
    const productosFiltrados =
        productos.filter(producto => producto.id === id);

    // si encontro algo
    if (productosFiltrados.length > 0) {

        res.json(productosFiltrados);

    } else {

        res.json({
            mensaje: 'Producto no encontrado'
        });

    }

});



///POST /productos

// Sirve para CREAR producto nuevo

app.post('/productos', (req, res) => {

    // Guardamos lo que manda el cliente
    const datosCliente = req.body;

    // Agregamos al array
    productos.push(datosCliente);

    // Respondemos creado
    res.status(201).json({
        mensaje: 'Producto creado'
    });

});



//PONERMOS A ESCUCHAR LA SERVIDOR
app.listen(puerto, () => {

    console.log(
        `Servidor escuchando en http://localhost:${puerto}`
    );

});
