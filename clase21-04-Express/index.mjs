import express from 'express';

const PUERTO = 3000;

const app = express();

app.get('/', (req, res) => {
    res.status(200);
    res.send('Hola erikkkk');
});

app.get('/usuarios', (req, res) => {
    res.status(200);
    res.set('Content-Type', 'text/html');
    res.end('<h1>Hola en /usuarios</h1>');
});

app.post('/', (req, res) => {
    res.end('Hola en POST /');
});

app.listen(PUERTO, () => {
    console.log(`Servidor escuchando en http://localhost:${PUERTO}`);
});