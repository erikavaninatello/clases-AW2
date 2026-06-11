// Token de acceso TID AW2 p.366

import express from 'express';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';//trasladamos al index
import bcrypt from 'bcryptjs';//libreria
import pool from './conexion.bd.mjs'; //importacion de archivos

//inyectar las variables de entorno al proceso
dotenv.config();

const PUERTO = process.env.PUERTO || 4000;

const app = express();

app.use(express.urlencoded({extended:true}))// ambos sirven para leer el cuerpo y parsear el cuerpo de los
//datos que vienen del cliente
app.use(express.json());//lo guardan como objeto en JS
//leer la cookie de la cabecera cuando el cliente la envia 
//crea un objeto cookies que lo transforma en un objeto JS
app.use(cookieParser());

app.post('/registrar', async (req, res) => {
    const { usuario, pass } = req.body;
    if (!usuario || !pass) {
        return res.sendStatus(400);
    }
    try {
        const salt = bcrypt.genSaltSync(10);
        const hashingPass = bcrypt.hashSync(pass, salt);
        const resultado = await pool.query(
            'INSERT INTO usuarios (username, password_hash) VALUES ($1, $2)',
            [usuario, hashingPass]
        );
        if (resultado.rowCount > 0) {
            res.redirect('/login'); // Redirigimos al usuario a la página de login
        } else {
            res.sendStatus(500);
        }
    } catch (error) {
        console.log(error);
        res.sendStatus(500);

    }
});
app.use('/login', express.static('./fronts/front-login'))
app.use('/admin', express.static('./fronts/front-admin'))

app.listen(PUERTO, () => {
    console.log(`Servidor escuchando en el puerto ${PUERTO}`);
});
